const fs = require('fs');
const path = require('path');
const girlsFileList = ['Olga.txt', 'Lena.txt', 'Tania.txt'];
const boysFileList = ['Roman.txt', 'Viktor.txt', 'Max.txt'];

const allDirectories = {
    girls : girlsFileList,
    boys : boysFileList,
}

const createFilesDir = (dirName, fileArr) => {
    fs.mkdir(path.join(process.cwd(), dirName), err => {
        if (err) console.log(err);
        if (!err) {
            console.log(`Папка ${dirName} создана`);
            fileArr.forEach(item => {
                fs.appendFile(path.join(process.cwd(), dirName, item), '', err => {
                    if (err) console.log(err);
                    if (!err) console.log(`Файл ${item} создан`);
                })
            })
        }
    })
};
const  createDirWithFiles = (dirObj) => {
    for (let dirItem in dirObj) {
        createFilesDir(dirItem, dirObj[dirItem])
    }
};

const removeDirList = (dirList) => { 
    for (let item in dirList) {
        fs.rmdir(path.join(process.cwd(), item), {recursive : true}, err => {
            if (err) console.log(err);
            if (!err) console.log(`Папка ${item} удалена `);
        })
    }
}

const readDir = (dirName) => {
    fs.readdir(path.join(process.cwd(), dirName), (err, files) => {
        if (err) console.log(err);
        if (!err) {
            if (files.length > 0) {
                files.forEach(item => {
                  console.log(item);
                })
            }
            if (files.length <= 0) {
                console.log(`В папке ${dirName} нет файлов`);
            }
        }
    })
}


const moveToDir = (dir1, dir2) => {
    const allDirs = [dir1, dir2];
    const dirBuffer1 = [];
    const dirBuffer2 = [];
    let isFirstDir = true;

    fs.readdir(path.join(process.cwd()), (err, dirs) => {
        if (err) console.log(err);
        if (!err) {
            dirs.forEach(item => {
               if (allDirs.includes(item)) fs.readdir(path.join(process.cwd(), item), (err, files)=> {
                   if (err) console.log(err);
                   if (!err) {
                    files.forEach(file => {
                        isFirstDir? dirBuffer1.push(file) : dirBuffer2.push(file);
                    });
                    isFirstDir = !isFirstDir
                   };
                   moveFiles(dir1, dir2, dirBuffer1);
                   moveFiles(dir2, dir1, dirBuffer2);
               });
            //    out
            });
        };
    });

    const moveFiles = (dir1, dir2, bufer) => {
        fs.readdir(path.join(process.cwd(), dir1), (err, files) => {
            if (err) console.log(err);
            if (!err) {
                if (files.length > 0) {
                    files.forEach(item => {
                        if (bufer.includes(item)) {
                            fs.rename(path.join(process.cwd(), dir1, item), path.join(process.cwd(), dir2, item), err => {
                                if (err) console.log(err);
                                if (!err) console.log(`Файл ${item} перемещен`);
                            });
                        }
                    })
                }
                if (files.length <= 0) {
                    console.log(`В папке ${dir1} нет файлов`);
                }
            }
        })
    }

}



// *Step 1. Create default files directory:

// createDirWithFiles(allDirectories);


// *Step 2. Move files between directories:

// moveToDir('boys','girls');

// *Step 3. Move files again:

// moveToDir('boys','girls');

// *Step 4. Delete created directories:

// removeDirList(allDirectories);

