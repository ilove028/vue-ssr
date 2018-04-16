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

app.use(async (context, next) => {
    try{
        context.body = await renderer.renderToString({ 
            url: context.url, 
            titel: 'Vue SSR' ,
            meta: `
                <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            `
        });
    }catch(e){
        if(399 < e.code && 404 !== e.code){
            context.throw(e.code);
        }else{
            await next();
        }
    }
});

app.on('error', err => {
    console.error(err);
});

app.listen(8081);