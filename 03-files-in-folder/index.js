const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, entries) => {
  entries.forEach((entry) => {
    const filePath = path.join(secretFolderPath, entry.name);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return;
      }
      if (stats.isFile()) {
        const fileExtension = path.extname(entry.name, '.');
        const fileName = path.basename(entry.name, fileExtension);
        console.log(`${fileName} - ${fileExtension.slice(1)} - ${stats.size}b`);
      }
    });
  });
});
