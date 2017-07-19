# fuse-box-demo

## Installation
Run `yarn install`

## Start 
Run `node fuse`

This will start the dev-server on localhost:4444, compile the files and watch for file changes.

## Issues
- The api loader tries to load `index.css` although `outFile: file => path.join(distPath, 'app.css')` is configured.
