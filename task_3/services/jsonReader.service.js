// !need to fix late loading of the last added user???
const fs = require('fs');
const path = require('path');

function jsonReader(filePath, newData) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object)
        } catch(err) {
             return cb && cb(err)
        } 
    });
    function cb(err, data){
        if (err) {
          console.log("Error reading file:", err);
          return;
        }
        try {
            data.push(newData);
            usersArr = data;
            fs.writeFile(filePath, JSON.stringify(data), err => {
                if (err) console.log("Error writing file:", err);
                if (!err) console.log("File written")
                return
            });
        } catch(pushError) {
            console.log('File type is not array', pushError);
        }
      }
};

module.exports = { jsonReader };