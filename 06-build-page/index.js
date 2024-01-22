const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    const outputFolderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(outputFolderPath, { recursive: true });
    console.log('successfully');
  } catch (error) {
    console.error('Error', error.message);
  }
}
buildPage();
