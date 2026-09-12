import Image from 'next/image';

/** Logo enviado pelo cliente; apenas o fundo foi removido, sem redesenho. */
export function Wordmark({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`relative inline-block aspect-[2360/1190] shrink-0 ${className}`}>
      <Image src="/assets/brand/logo-enviado-transparente.webp" alt="Srs da Limpeza" width={2360} height={1190} priority={priority} quality={100} sizes="(max-width: 640px) 200px, 400px" className="h-full w-full object-contain" />
    </span>
  );
}

/** Mesma marca utilizada no cabeçalho e no rodapé. */
export function BrandLockup({ className = '' }: { className?: string }) {
  return (
    <Wordmark className={`w-full ${className}`} />
  );
}
