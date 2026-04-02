import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

const imagesToConvert = [
    'background.png',
    'fajardo_sombrero.jpg'
];

async function convert() {
    for (const image of imagesToConvert) {
        const inputPath = path.join(publicDir, image);
        const outputPath = path.join(publicDir, image.split('.')[0] + '.webp');

        if (fs.existsSync(inputPath)) {
            console.log(`Converting ${inputPath} to ${outputPath}...`);
            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);
            console.log(`Finished converting ${image}`);
        } else {
            console.log(`File not found: ${inputPath}`);
        }
    }
}

convert().catch(err => {
    console.error('Error during conversion:', err);
    process.exit(1);
});
