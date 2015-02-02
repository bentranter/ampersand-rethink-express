# bundle-metadata

Gather some metadata of a browserify bundle, & sort the files,
so that a hash of the bundle will be consistent.

## Examples

### bundle bundle-metadata and save meta.json

```
npm install -g module-deps bundle-metadata browser-pack

cd ~/dev/bundle-metadata

module-deps index.js | bundle-metadata --meta meta.json | browser-pack > bundle.js
cat meta.json
```

### from the api, use like this:
``` js
mdeps(entry)
.pipe(meta()
  .on('meta', function (meta) {
    console.error(meta)
  })
).pipe(browserPack())
.pipe(process.stdout)
```

### as a browserify command

```
browserify -c 'bundle-metadata --meta meta.json' index.js > bundle.js
```

## License

MIT
