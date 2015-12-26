var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var arrayify = require('array-back')

module.exports = Fixture

function Fixture (name) {
  this.folder = path.resolve(__dirname, '..', '..', 'node_modules', 'jsdoc2md-testbed', name)
  this.sourcePath = path.resolve(this.folder, '0-src.js')

  this.getSource = function () {
    return fs.readFileSync(this.sourcePath, 'utf-8')
  }

  this.getExpectedOutput = function () {
    return JSON.parse(fs.readFileSync(path.resolve(this.folder, '1-jsdoc.json'), 'utf-8'))
  }

  this.createReadStream = function () {
    return fs.createReadStream(this.sourcePath)
  }
}

Fixture.createTmpFolder = function (folder) {
  try {
    fs.statSync(folder)
    rimraf.sync(folder)
    fs.mkdirSync(folder)
  } catch (err) {
    fs.mkdirSync(folder)
  }
}

Fixture.removeFileSpecificData = function () {
  arrayify(arguments).forEach(function (input) {
    if (input) {
      input.forEach(function (i) {
        delete i.meta
        delete i.files
      })
    }
  })
}
