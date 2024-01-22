const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    const outputFolderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(outputFolderPath, { recursive: true });
    const templateFilePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.readFile(templateFilePath, 'utf8');

    const tagNames = templateContent
      .match(/{{(.*?)}}/g)
      .map((tag) => tag.slice(2, -2).trim());

    for (const tagName of tagNames) {
      const componentFilePath = path.join(
        __dirname,
        'components',
        `${tagName}.html`,
      );
      const componentContent = await fs.readFile(componentFilePath, 'utf8');
      templateContent = templateContent.replace(
        new RegExp(`{{${tagName}}}`, 'g'),
        componentContent,
      );
    }
    const outputFilePath = path.join(outputFolderPath, 'index.html');
    await fs.writeFile(outputFilePath, templateContent, 'utf8');
    const stylesFolderPath = path.join(__dirname, 'styles');
    const styles = await readStylesFolder(stylesFolderPath);
    const bundleContent = styles.join('\n');
    const styleOutputPath = path.join(outputFolderPath, 'style.css');
    await fs.writeFile(styleOutputPath, bundleContent, 'utf8');
    const assetsSrcPath = path.join(__dirname, 'assets');
    const assetsDestPath = path.join(outputFolderPath, 'assets');
    await copyDir(assetsSrcPath, assetsDestPath);
  } catch (error) {
    console.error('Error', error.message);
  }
}
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

buildPage();
