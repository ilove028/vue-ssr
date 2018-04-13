const Koa = require('koa');
const { createBundleRenderer } = require('vue-server-renderer');
const app = new Koa();
const template = require('fs').readFileSync('/path/to/template.html', 'utf-8')
const serverBundle = require('/path/to/vue-ssr-server-bundle.json')
const clientManifest = require('/path/to/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
});

app.use(async context => {
    context.body = await renderer.renderToString({ url: context.url });
});

app.listen(8080);