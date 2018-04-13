import createApp from './app.js';

export default context => {
    // return  renderer.renderToString(app);
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if(!matchedComponents.length){
                return reject({ code: 404 });
            }else{
                Promise.all(matchedComponents.map(component => {
                    if(component.asyncData){
                        return component.asyncData({ store, router: router.currentRoute });
                    }
                })).then(() => {
                    context.state = store.state;
                    resolve(app);
                });
            }

            // resovle(app);
        //TODO onReady api
        }, reject);
    });
};