const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  try {
    const destExists = await fs
      .access(dest)
      .then(() => true)
      .catch(() => false);
    if (destExists) {
      await fs.rm(dest, { recursive: true });
    }
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src);
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error('Error', error.message);
  }
}
const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');
copyDir(srcPath, destPath);
