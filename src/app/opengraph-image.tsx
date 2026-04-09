import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge';
 
// Image metadata
export const alt = 'NERO | Industrial Luxury Performance';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(184, 151, 106, 0.15) 0%, transparent 70%)',
          }}
        />
        <p
          style={{
            fontSize: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            color: '#666666',
            marginBottom: 40,
            fontFamily: 'sans-serif',
          }}
        >
          Industrial Luxury Performance
        </p>
        <h1
          style={{
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: '#E8E6E3',
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          NERO
        </h1>
        <div
          style={{
            width: 120,
            height: 2,
            background: '#B8976A',
            marginTop: 60,
            marginBottom: 60,
          }}
        />
        <p
          style={{
            fontSize: 32,
            color: '#C4C0B9',
            fontFamily: 'sans-serif',
            maxWidth: 800,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Forged in darkness. Built for everywhere.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
