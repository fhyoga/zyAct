

const ArgumentParser = require('argparse').ArgumentParser;

const parser = new ArgumentParser()
parser.addArgument(
    ['-i', '--image'],
    {
        help: 'Your image path'
    }
)


module.exports = parser