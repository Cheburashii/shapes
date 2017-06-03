const path = require('path'),
    fs = require('fs');
function rename(dir, template) {
    fs.readdir(dir, (err, data) => {
        let usedNames = [],
            force = (arguments[2] === '-f' || arguments[2] === '-force');
        data.forEach((file, index) => {
            let fileName = template,
                ext = path.parse(path.join(dir, file));
            ext = ext.ext.split('');
            ext.shift();
            ext = ext.join('');
            fileName = fileName.replace('{index}', index);
            fileName = fileName.replace('{source-name}', path.parse(path.join(dir, file)).name);
            fileName = fileName.replace('{source-ext}', ext);
            fileName = fileName.replace('{date}', new Date().toDateString());
            if (usedNames.indexOf(fileName) === -1) {
                fs.rename(path.join(dir, file), path.join(dir, fileName));
                usedNames.push(fileName);
            } else if (force) {
                fs.unlink(path.join(dir, file), () => {
                    console.log(`File ${file} is rewrited.`);
                });
            } else {
                console.log(`File ${file} can\`t be renamed to ${fileName} because it\`s already taken.`);
            }
        });
    });
}

rename('D:/projects/jsTests/node/dir', 'text.{source-ext}', '-force');