const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const filePath = path.join(process.cwd(), 'users.json');
let usersArr = [{name : 'Alex'}];
const usersArrJson = JSON.stringify(usersArr);



// const writeJson = (fPath, data) => {
//     fs.appendFile((fPath), data, (err) => {
//         if (err) throw err;
//         console.log(data);
//         return
//     });
// };
// writeJson(filePath, usersArrJson);



// setTimeout(() => {
//     fs.readFile(filePath, (err, data) => {
//         if (err) throw err;
//         if (!err) {
//             if (data.toString() === '') {
//                 data = [];   
//                 usersArr = data;        
//             }
//             if (data.toString() !== '') {
//                 usersArr.push(data);        
//             }
//             };
//             return data
//     });
//     fs.writeFile(filePath, usersArrJson, err => {
//         if (err) throw err;
//         console.log('File is writen');
//     })
//     console.log(usersArr.toString());
// }, 2000)


function resolveReadJson(){
    fs.readFile(filePath, (err, data) => {
                // if (err) throw err;
                if (!err) {
                    if (data.toString() === '') {
                        data = [];   
                        usersArr = data;        
                    }
                    if (data.toString() !== '') {
                        usersArr.push(data);        
                    }
                    };
    })
    return usersArr
}

function rejectReadJson(){
    // fs.readFile(filePath, (err) => {
    //      if (err) return err;
    // })
    return false
}


function readFromJson(isRead){
    return new Promise((resolve,reject) => {
        if (isRead) resolve(resolveReadJson)
        else reject(rejectReadJson)
    })
}

// console.log(readFromJson(true));

async function startJson(isStart = true) {
    try {
        const read = readFromJson();
    } catch (err) {
        console.log(err);
    }

}
console.log(startJson(true));