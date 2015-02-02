#! /usr/bin/env node

var through = require('through')
var path    = require('path')
var crypto  = require('crypto')
var sha1sum = require('sha1sum')

var metadata = module.exports = function (opts) {
  var a = []
  opts = opts || {}

  return through(function (data) {
    a.push(data)
    data.hash = sha1sum(data.source)
  }, function () {

    a.sort(function (a, b) {
      return a.id == b.id ? 0 : a.id < b.id ? -1 : 1
    }).forEach(this.queue)

    var hash = crypto.createHash('sha1')
    var meta = {}

    a.forEach(function (data) {
      var r = path.relative(opts.relative || process.cwd(), data.id)
      meta[r] = data.hash
      hash.update(r + ':' + data.hash)
    })

    this.emit('hash', hash = hash.digest('hex'))
    this.emit('meta', {hash: hash, tree: meta, date: new Date, ts: Date.now()})

    this.queue(null)
  })
}

if(!module.parent) {
  var JSONStream = require('JSONStream')
  var opts       = require('optimist').argv
  var fs         = require('fs')
  var path       = require('path')

  process.stdin
  .pipe(JSONStream.parse([true]))
  .pipe(metadata(opts).on('meta', function (meta) {
    if(opts.meta)
    fs.writeFile(path.resolve(opts.meta), JSON.stringify(meta, null, 2))
  }))
  .pipe(JSONStream.stringify())
  .pipe(process.stdout)

}

