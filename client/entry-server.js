import createApp from './app.js';

export default context => {
    // return  renderer.renderToString(app);
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context);

        // console.info(context);

        router.push(
            context.url, 
            () => {
                console.info('router complete')
            }, (arg) => {
                if(arg instanceof Error){
                    reject({ code: parseInt(arg.message) });
                }
        });

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if(!matchedComponents.length){
                reject({ code: 404 });
            }else{
                Promise.all(matchedComponents.map(component => {
                    if(component.asyncData){
                        return component.asyncData({ store, route: router.currentRoute });
                    }
                })).then(() => {
                    context.state = store.state;
                    resolve(app);
                }).catch(err => {
                    reject(err);
                });
            }

            // resovle(app);
        //TODO onReady api onError and process of router navigation.
        }, err => {
            reject({ code: 500, err });
        });

        router.onError(err => {
            console.info(`router error handler.`);

            reject(err);
        })

    });
};