# webpack优化之dll

知识点:

* koa2
* 封装webpack-dev-middleware webpack-hot-middleware,以供koa使用,参考[这篇文章](http://www.tuicool.com/articles/MruEni)
* webpack.DllPlugin
* 抛弃了npm, 采用yarn

步骤:
```
yarn

//development
npm run build:dll-dev
npm run dev

//build
npm run build
```