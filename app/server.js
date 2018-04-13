const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const app = new Koa();
const template = require('fs').readFileSync('./app/index.template.html', 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
});

app.use(koaStatic(path.join(__dirname, '../dist')));

app.use(async context => {
    try{
        context.body = await renderer.renderToString({ 
            url: context.url, 
            titel: 'Vue SSR' ,
            meta: `
                <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            `
        });
    }catch(e){
        context.body = e;
    }
});

app.listen(8080);