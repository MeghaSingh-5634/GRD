import sharp from "sharp";
import path from "path";

async function compositeHero() {
  const width = 1376;
  const height = 768;

  // Create an SVG with the golden crest and glowing 3D GRD UNIVERSITY illuminated channel letters
  const svgOverlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Golden Shield Gradient -->
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE885" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#AA7C11" />
        </linearGradient>

        <!-- Glow filter for illuminated channel letters -->
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur2" />
        </filter>
      </defs>

      <!-- Sub-panel patch to smoothly blend previous text if any -->
      <rect x="520" y="210" width="460" height="260" rx="12" fill="#0c1825" opacity="0.94" />

      <!-- Golden Shield Crest -->
      <g transform="translate(560, 248) scale(0.9)">
        <!-- Shield Body -->
        <path d="M 0 0 L 50 0 C 50 45, 25 70, 0 85 C -25 70, -50 45, -50 0 Z" fill="url(#goldGrad)" stroke="#FFE885" stroke-width="3" filter="drop-shadow(0px 0px 10px rgba(255, 215, 0, 0.6))" />
        <!-- Inner Crest details -->
        <path d="M 0 8 L 40 8 C 40 40, 20 60, 0 74 C -20 60, -40 40, -40 8 Z" fill="#8B1E1E" stroke="#FFE885" stroke-width="1.5" />
        <!-- Torch / Book icon -->
        <path d="M -15 25 L 0 15 L 15 25 L 15 50 L 0 42 L -15 50 Z" fill="url(#goldGrad)" />
        <circle cx="0" cy="22" r="5" fill="#FFE885" />
      </g>

      <!-- "GRD" Text with illuminated white LED glow -->
      <g filter="url(#softGlow)" opacity="0.8">
        <text x="630" y="285" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="62" fill="#FFFFFF" letter-spacing="3">GRD</text>
        <text x="630" y="325" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="4">UNIVERSITY</text>
      </g>
      <g filter="url(#neonGlow)">
        <text x="630" y="285" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="62" fill="#FFFFFF" letter-spacing="3">GRD</text>
        <text x="630" y="325" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF" letter-spacing="4">UNIVERSITY</text>
      </g>
      <!-- Sub-line -->
      <text x="560" y="380" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="14" fill="#A0B3C6" letter-spacing="3">CAMPUS MAIN ENTRANCE &amp; ACADEMIC COMPLEX</text>
    </svg>
  `;

  await sharp("public/images/hero-signage.jpg")
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .toFile("public/images/hero-grd-building.jpg");

  console.log("Created public/images/hero-grd-building.jpg");
}

compositeHero().catch(console.error);
