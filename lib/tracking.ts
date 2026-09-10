export const CONSENT_KEY = 'srs-consent-v1';
export const GTM_ID = 'GTM-KJWZ3WT';
export type ContactLine = 'upholstery' | 'postWork';
export type ContactMethod = 'whatsapp' | 'telephone';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isProductionHost(host: string) {
  return host === 'srsdalimpeza.com.br' || host === 'www.srsdalimpeza.com.br';
}

export function contactFromUrl(href: string): { method: ContactMethod; line: ContactLine } | null {
  try {
    const url = new URL(href);
    const method = url.hostname === 'wa.me' ? 'whatsapp' : url.protocol === 'tel:' ? 'telephone' : null;
    if (!method) return null;
    const number = url.pathname.replace(/\D/g, '');
    const line = number === '5513974076009' ? 'upholstery' : number === '5513997187827' ? 'postWork' : null;
    return line ? { method, line } : null;
  } catch { return null; }
}

export function contactEvent(method: ContactMethod, line: ContactLine, placement: string, pathname: string) {
  // Lista explícita de campos: nunca enviar nome, telefone do visitante,
  // mensagem do formulário, URL do WhatsApp ou parâmetros da página.
  return {
    event: method === 'whatsapp' ? 'whatsapp_click' : 'telephone_click',
    contact_method: method,
    service_line: line,
    contact_placement: placement,
    page_path: pathname.split(/[?#]/)[0],
  };
}

export function hasTrackingConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === 'granted'; }
  catch { return false; }
}

export function trackContact(method: ContactMethod, line: ContactLine, placement: string) {
  if (typeof window === 'undefined' || !hasTrackingConsent()) return;
  // Prévia e desenvolvimento podem ser inspecionados no dataLayer, sem
  // carregar o contêiner nem transmitir eventos para as contas reais.
  window.dataLayer ??= [];
  window.dataLayer.push(contactEvent(method, line, placement, window.location.pathname));
}

export function startTracking() {
  if (!hasTrackingConsent() || !isProductionHost(window.location.hostname) || document.getElementById('srs-gtm')) return;
  window.dataLayer ??= [];
  window.gtag ??= function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'srs-gtm';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}
