/**
 * Generates public/og-image.jpg (1200×630) for social sharing and SEO.
 * Run once with: node scripts/generate-og-image.js
 * NOT part of the build script — re-run manually if branding changes.
 */

const sharp = require('sharp');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const photoSize = 340;
  const borderWidth = 3;

  // Photo centered vertically on the right
  const photoLeft = width - 100 - photoSize; // 760
  const photoTop = Math.round((height - photoSize) / 2); // 145

  // Gradient ring center & radius (sits behind the photo, showing as border)
  const ringCx = photoLeft + photoSize / 2;
  const ringCy = photoTop + photoSize / 2;
  const ringR = photoSize / 2 + borderWidth;

  const bgSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="bt" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="70"/>
    </filter>
    <filter id="bv" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="80"/>
    </filter>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64FFDA"/>
      <stop offset="50%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#64FFDA"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#080A0F"/>

  <!-- Aurora blobs -->
  <ellipse cx="160" cy="140" rx="260" ry="190" fill="#64FFDA" opacity="0.07" filter="url(#bt)"/>
  <ellipse cx="1080" cy="520" rx="200" ry="160" fill="#C084FC" opacity="0.06" filter="url(#bv)"/>
  <ellipse cx="820" cy="70" rx="130" ry="100" fill="#64FFDA" opacity="0.04" filter="url(#bt)"/>

  <!-- Border frame -->
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#1E2535" stroke-width="1"/>

  <!-- Top accent bar -->
  <rect x="60" y="68" width="44" height="3" fill="#64FFDA" rx="1.5"/>

  <!-- Section label -->
  <text x="60" y="110" font-family="'Courier New', Courier, monospace" font-size="13" fill="#64FFDA" letter-spacing="4">PORTFOLIO  ·  VGOMES.CO</text>

  <!-- Main name -->
  <text x="60" y="292" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#E8EDF5" letter-spacing="-3">Victor Gomes<tspan fill="#64FFDA">.</tspan></text>

  <!-- Job title -->
  <text x="60" y="352" font-family="'Courier New', Courier, monospace" font-size="18" fill="#64FFDA" letter-spacing="3">FRONT-END SOFTWARE ENGINEER</text>

  <!-- Divider -->
  <line x1="60" y1="387" x2="360" y2="387" stroke="#1E2535" stroke-width="1"/>

  <!-- Company + location -->
  <text x="60" y="422" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" fill="#6B7A99">Senior Engineer at Coinbase  ·  Atlanta, GA</text>

  <!-- Photo gradient ring border (photo composited on top of this) -->
  <circle cx="${ringCx}" cy="${ringCy}" r="${ringR}" fill="url(#ring)"/>
</svg>`;

  // Render background SVG to PNG buffer
  const bgBuffer = await sharp(Buffer.from(bgSvg))
    .png()
    .toBuffer();

  // Circular mask for the profile photo
  const circleMask = Buffer.from(
    `<svg width="${photoSize}" height="${photoSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${photoSize / 2}" cy="${photoSize / 2}" r="${photoSize / 2}" fill="white"/>
    </svg>`
  );

  // Resize profile photo and apply circular mask
  const profilePath = path.join(__dirname, '../public/profile-picture-2024.jpeg');
  const circularPhoto = await sharp(profilePath)
    .resize(photoSize, photoSize, { fit: 'cover', position: 'top' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Composite circular photo onto background
  const outputPath = path.join(__dirname, '../public/og-image.jpg');
  await sharp(bgBuffer)
    .composite([{ input: circularPhoto, left: photoLeft, top: photoTop }])
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`OG image generated at ${outputPath} (1200×630)`);
}

generateOGImage().catch(console.error);
