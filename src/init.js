const fs = require('fs')
const shell = require('shelljs')
const args = require('./arg').parseArgs()
const cutImg=require('./cut_img')

const targetPath = process.cwd()


function createTep() {

    fs.mkdir(`${targetPath}/img`,function(err) {
        if(!err){
            console.log('img');
        }
    })
    fs.readFile('./src/tep.html', 'utf8', function (err, data) {
        if (!err) {

            fs.writeFile(`${targetPath}/index.html`, data, function (err) {

                if (!err) {
                    console.log('HTML')
                }
            })
        }
    });
}


module.exports = function () {
    createTep()

    cutImg()
}