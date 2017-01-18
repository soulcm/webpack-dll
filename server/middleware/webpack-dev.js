import webpackDevMiddleware from 'webpack-dev-middleware';

export default (compiler, opts = {}) => {
    const stats = {
        chunkModules: false,
        colors: true,
        chunks: false
    }
    const {publicPath} = compiler.options.output;
    const defaults = opts.publicPath ? opts : { publicPath, stats };
    const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, opts));
    return async (context, next) => {
        const hasNext = await applyMiddleware(middleware, context.req, {
            send: content => context.body = content,
            setHeader: function () { context.set.apply(context, arguments) }
        });
        hasNext && await next();
    };

    /*return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.headers[name] = value
            }
        }, next)
    }*/
}

function applyMiddleware(middleware, req, res) {
    const _send = res.send;
    return new Promise((resolve, reject) => {
        try {
            res.send = function () { _send.apply(res, arguments) && resolve(false) };
            middleware(req, res, resolve.bind(null, true));
        } catch (error) {
            reject(error);
        }
    });
}
