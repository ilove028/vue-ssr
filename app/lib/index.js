const { createBundleRenderer } = require('vue-server-renderer');

module.exports = (app, options = {}) => {

    let renderer;
    let readyPromise;

    //TODO cache should be added.
    const createRenderer = (bundle, options) => {
        return createBundleRenderer(bundle, options);
    };

    if(options.hotReload){
        readyPromise = require('./setupDevServer')(
            app,
            options.templatePath,
            (bundle, options) => {
                renderer = createRenderer(bundle, options);
            }
        );
    }else{
        const template = fs.readFileSync(options.templatePath, 'utf-8');
        const bundle = require(options.serverBundle);
        const clientManifest = require(options.manifest);

        renderer = createRenderer(bundle, { template, clientManifest });
    }

    const render = (context, next) => {
        const start = +new Date();



        context.set('Content-Type', 'text/html');
        context.set('Server', 'Koa2');
    };

    return async (context, next) => {
        
    };
};