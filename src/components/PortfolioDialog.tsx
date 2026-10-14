import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';
import { profile } from '../data';
import type { Project } from '../data';

export type DialogState = { type: 'contact' } | { type: 'project'; project: Project } | null;

function ContactForm() {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const createInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    for (const [field, value] of [['name', name], ['message', message]]) {
      if (!value) {
        const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
        input.setCustomValidity('请填写这一项。');
        input.reportValidity();
        return;
      }
    }
    const inquiry = `你好，${profile.name}：\n\n${message}\n\n${name}\n回复邮箱：${email}`;
    setDraft(inquiry);
    try {
      await navigator.clipboard.writeText(inquiry);
      setCopied(true);
      setStatus('咨询内容已复制，可以通过邮件联系我。');
    } catch {
      setCopied(false);
      setStatus('草稿已准备好，请选中下方内容手动复制。');
    }
  };

  return (
    <form onSubmit={createInquiry} className="contact-form">
      <p className="text-silver/60 font-light">聊聊你的想法、项目与合作。可以直接发邮件，也可以先整理一份咨询草稿。</p>
      <div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={18} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub / {profile.name}<ArrowUpRight size={18} /></a></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>你的称呼<input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="怎么称呼你？" onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
        <label>回复邮箱<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      </div>
      <label>想聊的项目<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="简单介绍你的想法、希望实现的功能和时间安排……" onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <button type="submit" className="contact-button flex items-center justify-center gap-3">{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? '再次复制' : '复制咨询'}</button>
      <p role="status" className="text-sm text-silver/80 min-h-5">{status}</p>
      {draft && <div className="draft-label"><label htmlFor="inquiry-draft">咨询草稿</label><textarea id="inquiry-draft" readOnly value={draft} rows={5} onFocus={(event) => event.currentTarget.select()} /></div>}
    </form>
  );
}

export function PortfolioDialog({ state, onClose }: { state: DialogState; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = state !== null;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog ref={ref} className="portfolio-dialog" aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {state && <div className="dialog-content">
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭弹窗" autoFocus><X size={24} /></button>
        <p className="uppercase tracking-widest text-sm text-silver/60 mb-4">{state.type === 'contact' ? `Contact / ${profile.name}` : `${state.project.number} / ${state.project.category}`}</p>
        <h2 id="dialog-title" className="hero-heading dialog-title">{state.type === 'contact' ? "Let's create." : state.project.name}</h2>
        {state.type === 'contact' ? <ContactForm /> : <>
          <div className="project-detail">
            {state.project.status && <span className="project-status">{state.project.status}</span>}
            <p>{state.project.summary}</p>
            {state.project.technologies.length > 0 && <div className="technology-list">{state.project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
            {state.project.features.length > 0 && <ul>{state.project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
            {state.project.repository && <a className="repository-link" href={state.project.repository} target="_blank" rel="noopener noreferrer">查看 GitHub 仓库<ArrowUpRight size={18} /></a>}
          </div>
          <p className="visual-caption">项目功能与工作流示意</p>
          <div className="project-dialog-gallery">{state.project.images.map((src, index) => <img key={src} src={src} alt={state.project.imageDescriptions[index]} width={1200} height={index === 2 ? 1000 : 800} />)}</div>
        </>}
      </div>}
    </dialog>
  );
}
