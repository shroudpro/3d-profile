import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    emptyOutDir: false,
    manifest: true,
    rolldownOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        works: fileURLToPath(new URL('./works/index.html', import.meta.url)),
      },
    },
  },
  server: { port: 5174, strictPort: true },
});
