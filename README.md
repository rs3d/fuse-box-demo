# fuse-box-demo

## Installation
Run `yarn install`

## Start 
Run `node fuse`

This will start the dev-server on localhost:4444, compile the files and watch for file changes.

Open `http://localhost:4444/build/scripts/` in your browser

## Issues
- CSS is only injected on first load; Changes to the css are not injected without reloading.



## Suggestions
- Option to open a specific url `fuse.dev({
    open: 'http://localhost:4444/build/scripts/',
    root: '.'
  });` 






#### OLD
- The api loader tries to load `index.css` although `outFile: file => path.join(distPath, 'app.css')` is configured.
- If I use ```CSSPlugin({
        inject: file => `${distPath}/app.css`,
        outFile: file => `${distPath}/app.css`,
      })```
the correct filename is referenced. But then the dev serer won't find `http://localhost:4444/build/scripts/app.css` until i set the root like this ```fuse.dev({
    root: '.'
  });``` 
  Then I need to open `http://localhost:4444/build/scripts/index.html` but `app.js` can't be found because WebIndexPlugin is referencing it from the root: `/app.js`

It would be great if i could configure my server root to be '.' and build files are referenced according to the output path `FuseBox.init({  output: path.join(distPath, '$name.js') });` In my example this would be `/build/scripts/app.*`
It would be easier if the CSSPlugin would also use the `outFile` as default to file for injection.

    