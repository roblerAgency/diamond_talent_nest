import { promises as fs } from 'fs';
import { join } from 'path';

async function checkAndCreateUploadFolder() {
  // Cambia la ruta a '/app/dist/src/upload'
  const folderPath = join(__dirname, 'dist', 'src', 'upload');
  console.log({ folderPath })

  try {
    await fs.access(folderPath);
    console.info('La carpeta "upload" ya existe.');
  } catch (error) {
    await fs.mkdir(folderPath, { recursive: true }); // Crea la carpeta y cualquier carpeta padre necesaria
    console.info('La carpeta "upload" ha sido creada.');
  }
}

checkAndCreateUploadFolder().catch(console.error);
