import Image from 'next/image';

/**
 * Wordmark vetorial (redesenhado a partir do logo original, mesma tipografia
 * e gradiente) — nítido em qualquer tamanho. `white` para fundos escuros.
 */
export function Wordmark({ white = false, className = '' }: { white?: boolean; className?: string }) {
  return (
    <Image
      src={white ? '/assets/brand/wordmark-white.svg' : '/assets/brand/wordmark.svg'}
      alt="Srs da Limpeza"
      width={720}
      height={310}
      priority
      className={className}
    />
  );
}

/**
 * Lockup completo: wordmark vetorial + mascotes originais (recortados do
 * logo com fundo transparente), na mesma composição do logotipo da empresa.
 */
export function BrandLockup({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} role="img" aria-label="Srs da Limpeza">
      <Image src="/assets/brand/wordmark.svg" alt="" data-decorative width={720} height={310} className="h-auto w-full" />
      <Image
        src="/assets/brand/mascot-man.png"
        alt="" data-decorative
        width={70}
        height={160}
        className="float-slow absolute left-[-9%] top-[-30%] h-auto w-[11%]"
      />
      <Image
        src="/assets/brand/mascot-woman.png"
        alt="" data-decorative
        width={97}
        height={140}
        className="absolute bottom-[-2%] right-[-13%] h-auto w-[15%]"
      />
    </div>
  );
}
