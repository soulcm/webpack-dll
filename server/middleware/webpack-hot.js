import webpackHotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

export default (compiler, opts) => {
    const middleware = webpackHotMiddleware(compiler, opts)
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (state, headers) => {
                ctx.state = state
                ctx.set(headers)
            }
        }, next)
    }
}
