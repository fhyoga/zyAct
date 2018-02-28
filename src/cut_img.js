const path=require('path')
const sharp = require('sharp');
const shell = require('shelljs')

function cutImg(baseSize, targetPath,image) {
    const BASE_SIZE = 650   //切片高度
    let source=sharp(image)
    source.metadata().then(function (metadata) {
        let rawHeight = metadata.height
        let rawWidth = metadata.width
        let sliceCount = Math.floor(rawHeight / BASE_SIZE) + 1
        const sliceImg = createSliceImgFn(source, metadata, sliceCount, rawHeight, rawWidth,targetPath)
        for (let i = 0; i < sliceCount; i++) {
            sliceImg(i)
        }
        // setTimeout(function () {
        //     shell.exec('node node_modules/rimraf/bin.js output/temp*.png')
        // }, 2000)
    });


    function createSliceImgFn(source, metadata, sliceCount, rawHeight, rawWidth,targetPath) {

        return function (index) {

            if (index === 0) {
                source
                    .crop('north')
                    .resize(750, rawHeight - BASE_SIZE * (sliceCount - 1))
                    .toFile(`${targetPath}/img/_0${index+1}.png`)

                return
            }

            source
                .crop('south')
                .resize(750, BASE_SIZE * (sliceCount - index))
                .toFile(`${targetPath}/img/temp${index}.png`, function (err) {
                    sharp(`${targetPath}/img/temp${index}.png`)
                        .crop('north')
                        .resize(750, BASE_SIZE)
                        .toFile(`${targetPath}/img/_0${index+1}.png`, function () {
                            if (index == 1) {
                                let commandStr=`node ${path.resolve(__dirname,'../node_modules/rimraf/bin.js')} ${targetPath}/img/temp*.png`
                                console.log(path.resolve(__dirname,'../node_modules/rimraf/bin.js'));
                                shell.exec(commandStr)
                            }
                        })
                })
        }
        
    }
}
module.exports = cutImg