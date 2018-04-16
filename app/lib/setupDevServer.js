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

    
};