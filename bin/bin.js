#!/usr/bin/env node

const init = require('../src/init')
const targetPath = process.cwd()
const args = require('../src/arg').parseArgs()


const config = {
    height: 650,
    image: null,
    name: createProjectName()
}


Object.assign(config, args)

function createProjectName() {
    let date = new Date()
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

    
    return `act_${date.getFullYear()}0${date.getMonth()+1}${day}`
}

init(config, targetPath)