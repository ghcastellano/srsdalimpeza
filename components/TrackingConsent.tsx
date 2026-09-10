'use client';

import { useEffect, useState } from 'react';
import { CONSENT_KEY, contactFromUrl, startTracking, trackContact } from '@/lib/tracking';

export default function TrackingConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { setVisible(!localStorage.getItem(CONSENT_KEY)); } catch { setVisible(true); }
    startTracking();
    const settings = () => setVisible(true);
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const contact = contactFromUrl(link.href);
      if (!contact) return;
      const section = link.closest('section[id], header, footer');
      const placement = section?.id || section?.tagName.toLowerCase() || 'page';
      trackContact(contact.method, contact.line, placement);
    };
    window.addEventListener('srs-cookie-settings', settings);
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('srs-cookie-settings', settings);
      document.removeEventListener('click', click);
    };
  }, []);

  function choose(choice: 'granted' | 'denied') {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* Sem armazenamento, não ativar medição. */ }
    setVisible(false);
    if (choice === 'granted') startTracking();
    else {
      window.gtag?.('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      // Revogação: remover somente cookies conhecidos de medição deste site.
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (!/^(_ga|_gid|_gat|_gcl)(_|$)/.test(name)) continue;
        for (const domain of ['', window.location.hostname, '.srsdalimpeza.com.br']) {
          document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`;
        }
      }
      if (document.getElementById('srs-gtm')) window.location.reload();
    }
  }

  if (!visible) return null;
  return (
    <section role="region" aria-label="Preferências de cookies" className="fixed inset-x-3 bottom-3 z-[80] max-h-[80svh] overflow-y-auto rounded-2xl border border-ink/15 bg-white p-5 text-ink shadow-2xl sm:left-6 sm:right-auto sm:max-w-md sm:p-6">
      <h2 className="font-display text-lg font-semibold">Sua privacidade importa</h2>
      <p className="mt-2 text-sm leading-6 text-ink/80">Com sua autorização, usamos cookies do Google para medir visitas e contatos e avaliar nossos anúncios. Você pode recusar e continuar usando o site normalmente.</p>
      <a href="/politica-de-privacidade" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-aqua-dark underline underline-offset-4">Política de privacidade</a>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose('denied')} className="min-h-12 rounded-full border border-ink px-4 text-sm font-bold">Recusar opcionais</button>
        <button type="button" onClick={() => choose('granted')} className="min-h-12 rounded-full bg-ink px-4 text-sm font-bold text-white">Aceitar medição</button>
      </div>
    </section>
  );
}

export function CookieSettings() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event('srs-cookie-settings'))} className="flex min-h-11 w-fit items-center text-sm underline underline-offset-4">Preferências de cookies</button>;
}
