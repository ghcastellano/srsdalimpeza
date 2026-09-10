import Image from 'next/image';

/** Marca original intacta. O enquadramento CSS remove apenas as margens brancas. */
export function Wordmark({ white = false, className = '', priority = false }: { white?: boolean; className?: string; priority?: boolean }) {
  return (
    <span className={`relative inline-block aspect-[450/240] shrink-0 overflow-hidden ${white ? 'rounded-lg bg-white' : 'mix-blend-multiply'} ${className}`}>
      <Image src="/assets/brand/logo-site-original.webp" alt="Srs da Limpeza — logo original com os dois personagens" width={512} height={512} priority={priority} sizes="(max-width: 640px) 160px, 400px" className="absolute left-[-7.12%] top-[-52.5%] h-auto w-[113.78%] max-w-none" />
    </span>
  );
}

/** Mesma marca, sem reconstrução ou reposicionamento dos personagens. */
export function BrandLockup({ className = '' }: { className?: string }) {
  return (
    <Wordmark className={`w-full ${className}`} />
  );
}
