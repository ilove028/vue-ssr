import { createRenderer } from 'vue-server-renderer';
import createApp from './app.js';

const renderer = createRenderer();

export default () => {
    const { app } = createApp();

    return  renderer.renderToString(app);
};