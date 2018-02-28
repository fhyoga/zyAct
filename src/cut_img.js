const sharp = require('sharp');
const shell = require('shelljs')
const source = sharp('entry.png')

function cutImg(baseSize,targetPath) {
    const BASE_SIZE = 650   //切片高度

    source.metadata().then(function (metadata) {
        let rawHeight = metadata.height
        let rawWidth = metadata.width
        let sliceCount = Math.floor(rawHeight / BASE_SIZE) + 1
        const sliceImg = createSliceImgFn(source, metadata, sliceCount, rawHeight, rawWidth)
        for (let i = 0; i < sliceCount; i++) {
            sliceImg(i)
        }
        // setTimeout(function () {
        //     shell.exec('node node_modules/rimraf/bin.js output/temp*.png')
        // }, 2000)
    });


    function createSliceImgFn(source, metadata, sliceCount, rawHeight, rawWidth) {

        return function (index) {

            if (index === 0) {
                source
                    .crop('north')
                    .resize(750, rawHeight - BASE_SIZE * (sliceCount - 1))
                    .toFile(__dirname + `/output/output${index}.png`)

                return
            }

            source
                .crop('south')
                .resize(750, BASE_SIZE * (sliceCount - index))
                .toFile(__dirname + `/output/temp${index}.png`, function (err) {
                    sharp(__dirname + `/output/temp${index}.png`)
                        .crop('north')
                        .resize(750, BASE_SIZE)
                        .toFile(__dirname + `/output/output${index}.png`, function () {
                            if (index == 1) {
                                shell.exec('node node_modules/rimraf/bin.js output/temp*.png')
                            }
                        })
                })
        }
    }
}
module.exports = cutImg