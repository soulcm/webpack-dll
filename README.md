# webpack优化之dll

可以直接拿下来进行项目开发

知识点:

* koa2
* 封装webpack-dev-middleware webpack-hot-middleware,以供koa使用,参考[这篇文章](http://www.tuicool.com/articles/MruEni)
* webpack.DllPlugin
* 抛弃了npm, 采用yarn

步骤:
```
yarn

//development
npm run build:dll
npm run dev

//build
npm run build:dll
npm run build
```