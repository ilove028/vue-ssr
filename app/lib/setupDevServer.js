const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const clientConfig = require('../../build/webpack.client.config');
const serverConfig = require('../../build/webpack.server.config');
const MFS = require('memory-fs');

const readFile = (fs, file) => {
    try {
      return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    } catch (e) {}
};

module.exports = (app, templatePath, cb) => {
    let ready;
    let bundle;
    let template;
    let clientManifest;

    const readyPromise = new Promise(r => ready = r);
    const update = () => {
        if(bundle && clientManifest){
            ready();
            cb(bundle, {
                template,
                clientManifest
            });
        }
    };

    template = fs.readFileSync(templatePath, 'utf-8');
    fs.watch(templatePath, () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        console.log('index.html template updated.');
        update();
    });

    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.output.chunkFilename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )


    const clientCompiler = webpack(clientConfig);

    app.use(devMiddleware(clientCompiler, { publicPath: clientConfig.output.publicPath, noInfo: true }));

    clientCompiler.plugin('done', stats => {
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));

        if(!stats.errors.length){
            clientManifest = JSON.parse(readFile(
                devMiddleware.fileSystem,
                'vue-ssr-client-manifest.json'
                ));
            update();
        }
    });

  app.use(hotMiddleware(clientCompiler, { heartbeat: 5000 }));

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.errors.length) return;

    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    update();
  })

  return readyPromise;
};