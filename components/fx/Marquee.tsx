export default function Marquee({
  items,
  className = '',
  duration = 46,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {[0, 1].map((half) => (
          <span key={half} className="flex items-center">
            {items.map((item) => (
              <span key={`${half}-${item}`} className="flex items-center">
                <span className="px-5 sm:px-8">{item}</span>
                <span aria-hidden="true" className="text-aqua">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
