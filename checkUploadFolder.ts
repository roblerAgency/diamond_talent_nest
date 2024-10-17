import { promises as fs } from 'fs';
import { join } from 'path';

async function checkAndCreateUploadFolder() {
    const folderPath = join(__dirname, 'upload');

    try {
        await fs.access(folderPath);
        console.info('La carpeta "upload" ya existe.');
    } catch (error) {
        await fs.mkdir(folderPath);
        console.info('La carpeta "upload" ha sido creada.');
    }
}

checkAndCreateUploadFolder().catch(console.error);