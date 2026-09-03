import Reveal from './ui/Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  align = 'left',
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  id?: string;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto min-w-0 max-w-3xl text-center' : 'min-w-0 max-w-3xl'}>
      <Reveal><p className={`eyebrow ${dark ? 'text-sky' : 'text-aqua-dark'}`}>{eyebrow}</p></Reveal>
      <Reveal delay={.06}><h2 id={id} className={`display-title mt-5 text-[clamp(2rem,4.6vw,3.6rem)] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2></Reveal>
      {text && <Reveal delay={.12}><p className={`mt-5 max-w-2xl text-base ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-white/80' : 'text-ink/75'}`}>{text}</p></Reveal>}
    </div>
  );
}
