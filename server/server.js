const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const devConfig = require('../build/webpack.config.dev.js');
import devMiddleware from './middleware/webpack-dev.js';
import hotMiddleware from './middleware/webpack-hot.js';


const compile = webpack(devConfig);

const app = new Koa();

app.use(devMiddleware(compile, {
    publicPath: devConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(hotMiddleware(compile));



let html = ''
compile.plugin('done', () => {
    const fs = compile.outputFileSystem
    const filePath = path.join(devConfig.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
        html = fs.readFileSync(filePath, 'utf-8');
    }
})

app.use(async (ctx, next) => {
    await next();
    ctx.type = 'text/html';
    ctx.body = html;
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`listen at 127.0.0.1:${port}`)
    }
})



