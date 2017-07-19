const {
  FuseBox,
  Sparky,
  HTMLPlugin,
  JSONPlugin,
  SassPlugin,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin
} = require('fuse-box');
const path = require('path');



const basePath = './app';
const distPath = './build/scripts';

const fuse = FuseBox.init({
  homeDir: basePath,
  output: path.join(distPath, '$name.js'),
  cache: true,
  log: true,
  debug: false,
  tsConfig: 'tsconfig.json',
  experimentalFeatures: true,
  sourceMaps: {
    inline: false,
    sourceRoot: "/app"
  },
  standalone: true,
  plugins: [
    WebIndexPlugin({
      path: '.'
    })
  ]
});


Sparky.task("default", () => {
  const bundle = fuse.bundle(`app.js`)
    .plugin(JSONPlugin())
    .plugin([
      SassPlugin({
        outputStyle: 'compressed',
        sourceMap: `app.css.map`,
        outFile: '' // needs to be empty to be in the same folder as created css file
      }),
      CSSPlugin({
        inject: file => `app.css`,
        outFile: file => `${distPath}/app.css`,
      }),
    ])
    .plugin('.html',
      HTMLPlugin()
    )
    .instructions(`> index.ts`)
    .watch()
    .hmr();
  fuse.dev({
    open: 'http://localhost:4444/build/scripts/',
    root: '.'
  });
  fuse
    .run();
});
