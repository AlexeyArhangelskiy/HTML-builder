const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const outputFolderPath = path.join(__dirname, 'project-dist');
const outputFilePath = path.join(outputFolderPath, 'bundle.css');

function readStylesFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    const styles = [];
    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      if (file.isFile() && path.extname(filePath) === '.css') {
        const content = fs.readFileSync(filePath, 'utf8');
        styles.push(content);
      }
    });
    return styles;
  } catch (error) {
    console.error('error', error.message);
    return [];
  }
}
function writeBundleFile(styles) {
  try {
    const bundleContent = styles.join('\n');
    fs.writeFileSync(outputFilePath, bundleContent, 'utf8');
  } catch (error) {
    console.error('error', error.message);
  }
}
const styles = readStylesFolder(stylesFolderPath);
writeBundleFile(styles);
