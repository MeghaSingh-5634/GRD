import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = path.resolve("public/images");

async function prepareServicesAndProjects() {
  // 1. Service: Corporate Signage (with illuminated "CORPORATE" signage)
  const corporateSvg = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="600" height="400" fill="none"/>
      <!-- Facade header plate -->
      <rect x="70" y="140" width="460" height="85" rx="8" fill="#071320" opacity="0.9" stroke="#1c3552" stroke-width="2"/>
      <text x="300" y="198" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" text-anchor="middle" letter-spacing="8" filter="url(#glow)">CORPORATE</text>
    </svg>
  `;

  await sharp(path.join(imagesDir, "raw-corporate.jpg"))
    .resize(600, 400, { fit: "cover" })
    .composite([{ input: Buffer.from(corporateSvg), top: 0, left: 0 }])
    .toFile(path.join(imagesDir, "service-corporate.jpg"));

  // 2. Service: Institutional & Wayfinding
  await sharp(path.join(imagesDir, "raw-wayfinding.jpg"))
    .resize(600, 400, { fit: "cover" })
    .toFile(path.join(imagesDir, "service-wayfinding.jpg"));

  // 3. Service: Retail Branding (ZARA / Storefront)
  const retailSvg = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowGold">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect x="180" y="130" width="240" height="65" rx="6" fill="#0A0F18" opacity="0.92" stroke="#2A3545" stroke-width="1.5"/>
      <text x="300" y="176" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="36" fill="#FFF2C6" text-anchor="middle" letter-spacing="10" filter="url(#glowGold)">ZARA</text>
    </svg>
  `;
  await sharp(path.join(imagesDir, "raw-retail.jpg"))
    .resize(600, 400, { fit: "cover" })
    .composite([{ input: Buffer.from(retailSvg), top: 0, left: 0 }])
    .toFile(path.join(imagesDir, "service-retail.jpg"));

  // 4. Service: Large Format Printing
  await sharp(path.join(imagesDir, "raw-printing.jpg"))
    .resize(600, 400, { fit: "cover" })
    .toFile(path.join(imagesDir, "service-printing.jpg"));

  // 5. Service: Fabrication & Installation (Stainless Steel "SSSS" letters)
  const fabSvg = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="25%" stop-color="#E2E8F0"/>
          <stop offset="50%" stop-color="#94A3B8"/>
          <stop offset="75%" stop-color="#CBD5E1"/>
          <stop offset="100%" stop-color="#64748B"/>
        </linearGradient>
        <filter id="metalShadow">
          <feDropShadow dx="4" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
        </filter>
      </defs>
      <rect x="40" y="120" width="520" height="150" rx="12" fill="#0c1825" opacity="0.9" stroke="#334155" stroke-width="1.5"/>
      <g filter="url(#metalShadow)">
        <text x="140" y="225" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="110" fill="url(#chrome)">S</text>
        <text x="240" y="225" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="110" fill="url(#chrome)">S</text>
        <text x="340" y="225" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="110" fill="url(#chrome)">S</text>
        <text x="440" y="225" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="110" fill="url(#chrome)">S</text>
      </g>
    </svg>
  `;
  await sharp(path.join(imagesDir, "raw-fabrication.jpg"))
    .resize(600, 400, { fit: "cover" })
    .composite([{ input: Buffer.from(fabSvg), top: 0, left: 0 }])
    .toFile(path.join(imagesDir, "service-fabrication.jpg"));

  // 6. Project 1: GRD University
  await sharp(path.join(imagesDir, "raw-wayfinding.jpg"))
    .resize(700, 480, { fit: "cover" })
    .toFile(path.join(imagesDir, "project-grd.jpg"));

  // 7. Project 2: Planet Fashion
  await sharp(path.join(imagesDir, "planet-fashion.jpg"))
    .resize(700, 480, { fit: "cover" })
    .toFile(path.join(imagesDir, "project-planet-fashion.jpg"));

  // 8. Project 3: Max Healthcare
  const maxSvg = `
    <svg width="700" height="480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="maxGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Hospital Building Fascia -->
      <rect x="210" y="170" width="280" height="90" rx="10" fill="#0A1624" opacity="0.95" stroke="#1D3E64" stroke-width="2"/>
      <!-- Blue Cross -->
      <g transform="translate(235, 192)" filter="url(#maxGlow)">
        <rect x="15" y="0" width="16" height="46" rx="3" fill="#0284C7" />
        <rect x="0" y="15" width="46" height="16" rx="3" fill="#0284C7" />
      </g>
      <!-- MAX Healthcare Text -->
      <text x="295" y="218" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" letter-spacing="2" filter="url(#maxGlow)">MAX</text>
      <text x="297" y="244" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="14" fill="#38BDF8" letter-spacing="3">Healthcare</text>
    </svg>
  `;
  await sharp(path.join(imagesDir, "raw-healthcare.jpg"))
    .resize(700, 480, { fit: "cover" })
    .composite([{ input: Buffer.from(maxSvg), top: 0, left: 0 }])
    .toFile(path.join(imagesDir, "project-max-healthcare.jpg"));

  // 9. Project 4: Deloitte.
  const deloitteSvg = `
    <svg width="700" height="480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="deloitteGlow">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Glass facade header box -->
      <rect x="220" y="175" width="260" height="75" rx="8" fill="#071320" opacity="0.94" stroke="#1E3248" stroke-width="2"/>
      <g filter="url(#deloitteGlow)">
        <text x="245" y="226" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="40" fill="#FFFFFF" letter-spacing="1">Deloitte<tspan fill="#86EFAC">.</tspan></text>
      </g>
    </svg>
  `;
  await sharp(path.join(imagesDir, "raw-deloitte.jpg"))
    .resize(700, 480, { fit: "cover" })
    .composite([{ input: Buffer.from(deloitteSvg), top: 0, left: 0 }])
    .toFile(path.join(imagesDir, "project-deloitte.jpg"));

  console.log("All services and projects imagery generated successfully!");
}

prepareServicesAndProjects().catch(console.error);
