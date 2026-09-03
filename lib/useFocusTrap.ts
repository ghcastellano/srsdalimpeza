import { useEffect, useRef } from 'react';

/**
 * Focus-trap para overlays modais (menu mobile, lightbox).
 *
 * Enquanto `active`:
 * - move o foco para dentro do container (primeiro elemento focável, ou o
 *   próprio container);
 * - mantém o Tab/Shift+Tab em ciclo dentro do container;
 * - chama `onEscape` ao pressionar Escape;
 * - ao desativar, devolve o foco ao elemento que estava focado antes de abrir
 *   (tipicamente o gatilho que abriu o modal).
 *
 * Não mexe em aria-hidden/inert do resto da página — o container deve declarar
 * role="dialog" aria-modal="true"; o trap de Tab já impede o alcance do fundo
 * por teclado.
 */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap<T extends HTMLElement>(active: boolean, onEscape?: () => void) {
  const ref = useRef<T>(null);
  // Guardado em ref para não recriar o efeito e não perder o gatilho original.
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Foco inicial: primeiro focável ou o próprio container (torna-o alvo).
    const first = focusables()[0];
    if (first) {
      first.focus();
    } else {
      container.setAttribute('tabindex', '-1');
      container.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      const outsideContainer = !container || !container.contains(activeEl);
      if (event.shiftKey) {
        if (activeEl === firstItem || outsideContainer) {
          event.preventDefault();
          lastItem.focus();
        }
      } else if (activeEl === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // Devolve o foco ao gatilho, se ele ainda estiver no documento.
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active]);

  return ref;
}
