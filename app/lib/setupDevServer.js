const fs = require('fs');
const webpack = reuqire('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const clientConfig = require('../../build/webpack.client.config');
const serverConfig = require('../../build/webpack.server.config');

const readFile = (fs, file) => {
    try {
      return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {}
};

module.exports = (app, templatePath, ch) => {
    let ready;
    let bundle;
    let template;
    let clientManifset;

    const readyPromise = new Promise(r => ready = r);
    const update = () => {
        if(bundle && clientManifset){
            ready();
            cb(bundle, {
                template,
                clientManifset
            });
        }
    };

    template = fs.readFileSync(templatePath, 'utf-8');
    fs.watch(templatePath, () => {
        template = fs.readFileSync(templatePath, 'utf-8')
        console.log('index.html template updated.')
        update()
    });


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
                ))
        }
        update()
    });
};