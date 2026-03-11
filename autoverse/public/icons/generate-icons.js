// PWA Icon Generator Script
// Run: node generate-icons.js

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = join(__dirname, 'icon.svg');
const outputDir = __dirname;

async function generateIcons() {
    console.log('Generating PWA icons...');

    for (const size of sizes) {
        const outputPath = join(outputDir, `icon-${size}x${size}.png`);

        try {
            await sharp(inputSvg)
                .resize(size, size)
                .png()
                .toFile(outputPath);

            console.log(`✓ Generated ${size}x${size} icon`);
        } catch (error) {
            console.error(`✗ Failed to generate ${size}x${size}:`, error.message);
        }
    }

    console.log('\nDone! Icons generated in:', outputDir);
}

generateIcons();
