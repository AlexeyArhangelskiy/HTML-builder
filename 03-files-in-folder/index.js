const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, entries) => {

    const files = entries.filter(entry => entry.isFile());

    files.forEach(file => {
      console.log(file.name);
    });
  });