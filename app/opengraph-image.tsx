import { ImageResponse } from 'next/og';

export const alt = 'Srs da Limpeza — higienização de estofados e limpeza pós-obra';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #062637 0%, #0f5f83 55%, #1d9bc4 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, letterSpacing: 6, textTransform: 'uppercase', opacity: .9 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: '#7fd9ea' }} />
          Srs da Limpeza · desde 2018
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>Seu sofá como novo.</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: '#7fd9ea' }}>Sua casa livre de ácaros.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, opacity: .92 }}>
          <span>Guarujá · Santos · Bertioga</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="30" height="30" viewBox="0 0 24 24" fill="#ffd24a">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
              </svg>
            ))}
            <span style={{ marginLeft: 6 }}>Excelente no Google</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
