import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Check, Copy, X } from 'lucide-react';
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
        input.setCustomValidity('Please fill out this field.');
        input.reportValidity();
        return;
      }
    }
    const inquiry = `Hi Jack,\n\n${message}\n\n${name}\n${email}`;
    setDraft(inquiry);
    try {
      await navigator.clipboard.writeText(inquiry);
      setCopied(true);
      setStatus('Inquiry copied. You can now share it with Jack.');
    } catch {
      setCopied(false);
      setStatus('Your inquiry is ready. Select and copy the draft below.');
    }
  };

  return (
    <form onSubmit={createInquiry} className="contact-form">
      <p className="text-silver/60 font-light">Tell me what you have in mind. Copy your inquiry, then share it with Jack.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Alex Taylor" onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@example.com" /></label>
      </div>
      <label>About your project<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="A little about your idea, timeline, and what you'd like to create…" onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <button type="submit" className="contact-button flex items-center justify-center gap-3">{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? 'Copy again' : 'Copy inquiry'}</button>
      <p role="status" className="text-sm text-silver/80 min-h-5">{status}</p>
      {draft && <div className="draft-label"><label htmlFor="inquiry-draft">Your inquiry</label><textarea id="inquiry-draft" readOnly value={draft} rows={5} onFocus={(event) => event.currentTarget.select()} /></div>}
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
        <button type="button" className="dialog-close" onClick={onClose} aria-label="Close dialog" autoFocus><X size={24} /></button>
        <p className="uppercase tracking-widest text-sm text-silver/60 mb-4">{state.type === 'contact' ? 'Contact me' : `${state.project.number} / ${state.project.category}`}</p>
        <h2 id="dialog-title" className="hero-heading dialog-title">{state.type === 'contact' ? "Let's create." : state.project.name}</h2>
        {state.type === 'contact' ? <ContactForm /> : <div className="project-dialog-gallery">{state.project.images.map((src, index) => <img key={src} src={src} alt={state.project.imageDescriptions[index]} width={1280} height={720} />)}</div>}
      </div>}
    </dialog>
  );
}
