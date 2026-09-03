'use client';

import { useEffect, useState } from 'react';
import { WhatsIcon } from './Hero';
import { messages, whatsappUrl } from '@/lib/content';

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1800);
    const onScroll = () => { if (window.scrollY > 240) setVisible(true); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <a
      href={whatsappUrl(messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir orçamento no WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`group fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 rounded-full bg-whatsapp py-2 pl-2 pr-2 text-ink shadow-[0_14px_36px_-10px_rgba(37,211,102,.75)] transition-all duration-500 ease-out sm:bottom-6 sm:right-6 sm:pr-5 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <span className="fab-pulse grid h-12 w-12 place-items-center rounded-full bg-whatsapp"><WhatsIcon className="h-7 w-7" /></span>
      <span className="hidden text-sm font-bold sm:block">Orçamento grátis</span>
    </a>
  );
}
