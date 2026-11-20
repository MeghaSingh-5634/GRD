import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = path.resolve("public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`Downloaded ${destPath}`);
}

async function main() {
  console.log("Preparing high-fidelity assets matching reference design...");

  // 1. Corporate Signage Service Image (illuminated corporate building facade with bold letters "CORPORATE")
  await downloadImage(
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-corporate.jpg")
  );

  // 2. Institutional & Wayfinding Service Image
  await downloadImage(
    "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-wayfinding.jpg")
  );

  // 3. Retail Branding Service Image (storefront facade with bright illumination)
  await downloadImage(
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-retail.jpg")
  );

  // 4. Large Format Printing Service Image (roll-to-roll printer with rainbow spectrum)
  await downloadImage(
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-printing.jpg")
  );

  // 5. Fabrication & Installation Service Image (chrome/metal channel letters)
  await downloadImage(
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-fabrication.jpg")
  );

  // 6. Max Healthcare Project
  await downloadImage(
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-healthcare.jpg")
  );

  // 7. Deloitte Corporate Project
  await downloadImage(
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85",
    path.join(imagesDir, "raw-deloitte.jpg")
  );

  // 8. Avatar for Dr. R.K. Sharma
  await downloadImage(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=85",
    path.join(imagesDir, "avatar-dr-sharma.jpg")
  );

  console.log("All raw assets downloaded successfully!");
}

main().catch(console.error);
