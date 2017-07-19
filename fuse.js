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
    WebIndexPlugin()
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
        inject: true,
        outFile: file => path.join(distPath, `app.css`)
      }),
    ])
    .plugin('.html',
      HTMLPlugin()
    )
    .instructions(`> index.ts`)
    .watch()
    .hmr();
  fuse.dev({
    open: true
  });
  fuse
    .run();
});
