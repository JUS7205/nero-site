import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #B8976A',
        }}
      >
        <span
          style={{
            color: '#E8E6E3',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  );
}
