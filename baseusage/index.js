const Koa = require('koa');
const serverApp = new Koa();
const Vue = require('vue');
const app = new Vue({
    template: 
        '<div>Hellow Vue SSR.</div>',
    beforeCreate(){
        console.info('Before Create');
    },
    created(){
        console.info('Created');
    }
});
const PORT = 8080;

const fs = require('fs');

const renderer = require('vue-server-renderer').createRenderer({ template: fs.readFileSync('./baseusage/index.template.html', 'utf-8') });

serverApp.use(async (context, next) => {
    const renderContext = {
        title: 'ni hao',
        meta: '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
    }
    const html = await renderer.renderToString(app, renderContext);

    context.body = html;
});

// serverApp.onerror

serverApp.listen(PORT, () => {
    console.info(`Server start on ${ PORT }`);
});