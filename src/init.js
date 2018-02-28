const fs = require('fs')
const shell = require('shelljs')

const cutImg = require('./cut_img')

function createTep(config, targetPath) {


    fs.mkdirSync(`${targetPath}/${config.name}`, function (err) {
        if (!err) {
            console.log('img');
        }
    })
    fs.mkdirSync(`${targetPath}/${config.name}/img`, function (err) {
        if (!err) {
        }
    })
    fs.readFile(__dirname + '/tep.html', 'utf8', function (err, data) {
        if (!err) {

            fs.writeFile(`${targetPath}/${config.name}/index.html`, data, function (err) {

                if (!err) {
                }
            })
        }
    });
}


module.exports = function (config, targetPath) {

    if (!config.image) {
        console.log('image path is required');
        return
    }

    createTep(config, targetPath)
    cutImg(config.height, `${targetPath}/${config.name}`, config.image)
}