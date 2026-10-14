// Portable source synchronization and packaging, without recursive staging cleanup.
import { execFile } from 'node:child_process';
import { copyFile, cp, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);

const input = await new Promise((resolve, reject) => {
  let text = '';
  const terminal = process.stdin.isTTY;
  const finish = (error) => {
    process.stdin.removeListener('data', read);
    process.stdin.removeListener('end', end);
    if (terminal) process.stdin.setRawMode(false);
    process.stdin.pause();
    error ? reject(error) : resolve(text);
  };
  const read = (chunk) => {
    text += chunk;
    if (text.includes('\u0003') || text.length > 65536) finish(new Error('Source operation cancelled or input too large.'));
    else if (/[\r\n]/.test(text)) finish();
  };
  const end = () => finish();
  if (terminal) {
    process.stdin.setRawMode(true);
    process.stderr.write('Ready for Site workflow JSON on stdin (input is hidden).\n');
  }
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', read);
  process.stdin.once('end', end);
  process.stdin.resume();
});

const { credential, project_id: projectId } = JSON.parse(input);
const hosting = JSON.parse(await readFile('.openai/hosting.json', 'utf8'));
if (hosting.project_id !== projectId || hosting.static?.directory !== 'dist') throw new Error('Site manifest does not match the selected static project.');
if (credential?.auth_mode !== 'http_extra_header' || !credential.token || /[\r\n\0]/.test(credential.token)) throw new Error('Invalid source credential.');
const remote = new URL(credential.remote_url);
if (remote.protocol !== 'https:' || remote.username || remote.password || remote.search || remote.hash) throw new Error('Invalid source remote.');
if (Date.parse(credential.token_expires_at) <= Date.now()) throw new Error('Source credential expired.');
if (['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR'].some((name) => process.env[name])) throw new Error('Git environment overrides are not supported.');

const environment = { ...process.env, JACK_SITE_GIT_AUTHORIZATION: `Authorization: Bearer ${credential.token}` };
async function git(args, network = false) {
  const auth = network ? ['-c', 'credential.helper=', '-c', 'http.extraHeader=', '-c', 'http.followRedirects=false', `--config-env=http.${credential.remote_url}.extraHeader=JACK_SITE_GIT_AUTHORIZATION`] : [];
  try {
    return (await run('git', [...auth, ...args], { cwd: root, env: environment })).stdout.trim();
  } catch (error) {
    throw new Error(String(error.stderr || 'Git operation failed.').replaceAll(credential.token, '[redacted]'));
  }
}

if (await realpath(await git(['rev-parse', '--show-toplevel'])) !== await realpath(root)) throw new Error('Source must use its own Git repository.');
await git(['check-ref-format', `refs/heads/${credential.branch}`]);
await git(['add', '--all', '--', '.']);
const tree = await git(['write-tree']);
const changed = await git(['diff', '--cached', '--name-only']);
if (changed) await git(['commit', '-m', 'Build Jack 3D creator portfolio']);
const sha = await git(['rev-parse', 'HEAD']);
if (await git(['rev-parse', 'HEAD^{tree}']) !== tree || await git(['status', '--porcelain'])) throw new Error('Source changed while committing.');
await git(['push', credential.remote_url, `${sha}:refs/heads/${credential.branch}`], true);
const remoteSha = (await git(['ls-remote', '--heads', credential.remote_url, `refs/heads/${credential.branch}`], true)).split(/\s+/)[0];
if (remoteSha !== sha) throw new Error('Pushed source does not match the local commit.');

// Keep the staging directory for inspection; do not delete user workspace files.
const stage = path.join(root, 'artifacts', `site-stage-${sha.slice(0, 12)}`);
await cp(path.join(root, 'dist'), path.join(stage, 'dist'), { recursive: true });
await mkdir(path.join(stage, 'dist/.openai'), { recursive: true });
await copyFile(path.join(root, '.openai/hosting.json'), path.join(stage, 'dist/.openai/hosting.json'));
const archive = path.join(root, 'artifacts', `site-${sha.slice(0, 12)}.tar.gz`);
await run('tar', ['-C', stage, '-czf', archive, 'dist']);
const listing = (await run('tar', ['-tzf', archive])).stdout;
if (!listing.includes('dist/.openai/hosting.json') || !listing.includes('dist/index.html')) throw new Error('Deployment archive is incomplete.');
const result = { project_id: projectId, checkout_path: root, commit_sha: sha, archive };
await writeFile(path.join(root, 'artifacts/site-workflow.json'), `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
