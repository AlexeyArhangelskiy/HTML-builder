const fs = require('fs').promises;
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const outputFolderPath = path.join(__dirname, 'project-dist');
const outputFilePath = path.join(outputFolderPath, 'bundle.css');
async function readStylesFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    const styles = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);

      if (file.isFile() && path.extname(filePath) === '.css') {
        const content = await fs.readFile(filePath, 'utf8');
        styles.push(content);
      }
    }
    return styles;
  } catch (error) {
    console.error('error', error.message);
    return [];
  }
}
async function writeBundleFile(styles) {
  try {
    const bundleContent = styles.join('\n');
    await fs.writeFile(outputFilePath, bundleContent, 'utf8');
  } catch (error) {
    console.error('error', error.message);
  }
}
async function run() {
  const styles = await readStylesFolder(stylesFolderPath);
  await writeBundleFile(styles);
}
run();
