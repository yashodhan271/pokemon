import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const sizes = [192, 512];
  const inputFile = path.join(__dirname, '../public/logo.svg');
  
  for (const size of sizes) {
    await sharp(inputFile)
      .resize(size, size)
      .toFile(path.join(__dirname, `../public/logo${size}.png`));
  }

  // Generate favicon
  await sharp(inputFile)
    .resize(32, 32)
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);
