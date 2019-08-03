# Cesium中级教程10 - CesiumJS and webpack
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

webpack是打包JavaScript模块流行且强大的工具。它允许开发人员以直观的方式构造代码和assets，并使用简单的*require*语句根据需要加载不同类型的文件。构建时，它将跟踪代码依赖关系，并将这些模块打包到浏览器加载的一个或多个包中。

在本教程的前半部分，我们从头开始建立了简单的Web应用程序使用webpack，然后覆盖后续步骤集成[Cesium npm module](https://www.npmjs.com/package/cesium)。如果你喜欢使用cesiumjs开发Web应用,那么webpack是一个好的选择。如果您是刚接触Cesium并且想要寻找学习构建您的第一个样例应用，请查看[Getting Started Turtorial](https://cesium.com/docs/tutorials/getting-started/)。

在第二部分，我们将探索更高级的Webpack配置，以优化使用CesiumJS的应用程序。

在官方的[cesium-webpack-example](https://github.com/AnalyticalGraphicsInc/cesium-webpack-example)中可以找到优化CesiumJS webpack应用程序的完整代码和提示。

## Prerequisites 先决条件
- 基本了解命令行、JavaScript和Web开发。
- 一个IDE或代码编辑器。Cesium团队的开发人员使用Visual Studio Code，但是一个最小的代码编辑器（如Sublime文本）也完全没有问题。
- 已安装**Node.js**。我们建议使用最新的LTS版本。

## Create a basic webpack app 创建基础webpack应用
在本节中，我们将介绍如何使用webpack和开发服务器设置基本的Web应用程序。如果您已经设置了一个应用程序，并且只想添加cesiumjs，请跳过[Add CesiumJS to a webpack app](https://cesium.com/docs/tutorials/cesium-and-webpack/#add-cesiumjs-to-a-webpack-app)。

### Initialize an app with npm 使用npm初始化应用
为您的应用创建一个新的*cesium-webpack*。打开控制台，导航到新目录，然后运行以下命令：
```javascript
npm init
```
按照提示操作并填充有关应用程序的所有详细信息。按*enter*键使用默认值。这将创建**package.json**。

### Create the app code 创建应用代码
为我们的应用程序代码创建一个*src*目录。当我们构建应用程序时，webpack将在*dist*目录中生成**分发文件**。

创建*src/index.html*然后为样板HTML页添加代码。
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Hello World!</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```
接下来，为应用程序创建一个入口点。这是webpack查找包的所有javascript源代码和依赖项的**entry point**起点。

创建*src/index.js*然后添加下列代码：
```javascript
console.log('Hello World!');
```

### Install and configure webpack 安装和配置webpack
开始安装webpack：
```javascript
npm install --save-dev webpack
```

#### Configuration 配置
创建*webpack.config.js*以定义webpack配置对象。
```javascript
const path = require('path');

const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    }
};
```
*context*指定文件的基本路径。*entry*用于指定包。在这种情况下，*app*包的入口点是*src/index.js*。webpack将把打包后的*app.js*输出到*dist*文件夹。

#### Loaders 加载
Webpack像模块一样加载所有内容。使用*loaders*加载CSS和其他资产文件。安装**style-loader**、**css-loader**和**url-loader**。
```javascript
npm install --save-dev style-loader css-loader url-loader
```
在*webpack.config.js*中添加两个*module.rules*：一个用于css文件，另一个用于其他静态文件。对于每个，*test*定义要加载的文件类型，*use*指定加载程序的列表。
```javascript
const path = require('path');

const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    }
};
```

#### Plugins 插件
定义*index.html*并使用一个名为**html-webpack-plugin**的webpack **plugin**将包注入该页面。
```javascript
npm install --save-dev html-webpack-plugin
```
在*webpack.config.js*中引用该插件，然后将它注入到*plugins*。将*src/index.html*传入作为我们的*template*。
```javascript
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
```
> 配置文件是一个javascript文件，因此我们可以引入其他节点模块并执行操作。

### Bundle the app 捆绑应用
使用*package.json*定义可以使用*npm*调用的脚本。添加*build*命令。
```javascript
  "scripts": {
    "build": "node_modules/.bin/webpack --config webpack.config.js"
  }
```
此脚本调用Webpack并传递进*webpack.config.js*配置文件。
> 我们在这些脚本中使用webpack和webpack-dev-server的本地安装。这允许每个项目使用自己的单独版本，这是[webpack文档](https://webpack.js.org/guides/installation/)推荐的版本。如果您希望使用全局版本，请使用npm install--global webpack全局安装它，并使用命令webpack--config webpack.config.js运行它。

当运行build命令时：
npm run build

您应该看到webpack的一些输出，从以下内容开始：
```javascript
npm run build

> test-app@1.0.0 build C:\workspace\test-app
> node_modules/.bin/webpack --config webpack.config.js

Hash: 2b42bff7a022b5d956a9
Version: webpack 3.6.0
Time: 2002ms
                                        Asset       Size  Chunks                    Chunk Names
     Assets/Textures/NaturalEarthII/2/0/3.jpg    10.3 kB          [emitted]
                                       app.js     162 kB       0  [emitted]         app
```
*app.js*包和*index.html*文件将被输出到*dist*文件夹中。

### Run the development server 运行开发服务器
使用**webpack-dev-server**服务于开发构建然后可以在行动中看到我们的应用：
```javascript
npm install --save-dev webpack-dev-server
```
在package.json中添加一个*start*脚本以运行开发服务器。通过*--config*标志设置配置文件。执行命令时，使用*--open*标志在浏览器中打开应用程序。
```javascript
  "scripts": {
    "build": "node_modules/.bin/webpack --config webpack.config.js",
    "start": "node_modules/.bin/webpack-dev-server --config webpack.config.js --open"
  }
```

告诉开发服务器为*dist*文件夹提供文件。将其添加到*webpack.config.js*的底部。
```javascript
    // development server options
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
```
最终，我们运行app
```javascript
npm start
```

![](https://i.loli.net/2019/06/05/5cf7deb987a4d30895.png)

![](https://i.loli.net/2019/06/05/5cf7dc038de0b80391.png)


你应该看到你的内容在**localhost:8080**上呈现，看到“Hello World！“打开浏览器控制台时，显示消息。

## Add CesiumJS to a webpack app 将CesiumJS加入到webpack应用
### Install CesiumJS 安装CesiumJS
从npmg上安装**cesium**模块，并将其加入到package.json。

### Configure CesiumJS in webpack 在webpack中配置CesiumJS
CesiumJS是一个庞大而复杂的库。除了javascript模块之外，它还包括静态资产，如css、image和json文件。它包括Web worker文件，以便在单独的线程中执行密集计算。与传统的npm模块不同，CesiumJS没有定义入口点，因为库的使用方式多种多样。我们需要配置一些附加选项，以便与webpack一起使用。

首先，定义CesiumJS的位置。本教程基于源代码，因此webpack可以包含单个模型并跟踪依赖项。或者，也可以使用CesiumJS的内置（简化或未简化）版本。然而，这些模块已经被组合和优化，这给了我们更少的灵活性。

将下列代码加入到*webpack.config.js*的顶部：
```javascript
// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
```

> 本教程使用npm模块以便于安装，但您也可以克隆[Github仓库](https://github.com/AnalyticalGraphicsInc/cesium)或下载解压使用[release版本](https://cesiumjs.org/downloads/)。

将以下选项添加到配置对象，以解决webpack如何编译CesiumJS的一些问题。
```javascript
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
```
- *output.sourcePrefix: 在每行之前添加\t制表符，以便覆盖webpack默认值。CesiumJS有一些多行字符串，因此我们需要用空前缀*''*覆盖此默认值。
- *amd.toUrlUndefined: true* 告诉CesiumJS AMD webpack使用不符合标准*toUrl*函数的评估require语句的版本。
- *node.fs: 'empty'* 解决*fs*模块的某些第三方使用问题，该模块的目标是在节点环境中使用，而不是在浏览器中使用。

添加*cesium* **alias**，以便我们可以在应用程序代码中引用它。

```javascript
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
```

### Manage CesiumJS static files 管理CesiumJS中的静态文件

最后，确保静态CesiumJS资产、小部件和web worker文件得到正确的服务和加载。

作为构建过程的一部分，使用**copy-webpack-plugin**将静态文件复制到*dist*目录。
```javascript
npm install --save-dev copy-webpack-plugin
```

在* webpack.config.js*文件中的上部引入：
```javascript
const CopywebpackPlugin = require('copy-webpack-plugin');
```
并将其加入到*plugins*数组中：
```javascript
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ])
    ],
```
这将复制*Assets*和*Widgets*目录以及*built*的web worker脚本。
> 如果您使用的是CesiumJS仓库的fork，那么*Build*文件夹将不存在。运行*npm run release*生成输出文件夹。有关详细信息，请参阅[《Cesium生成指南》](https://github.com/AnalyticalGraphicsInc/cesium/blob/master/Documentation/Contributors/BuildGuide/README.md)。

定义一个环境变量，该变量告诉CesiumJS使用webpack**DefinePlugin**加载静态文件的基本URL。*plugins*数组现在将如下所示：
```javascript
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ],
```

### Require CesiumJS modules in our app 在应用中引用CesiumJS模块

在我们的应用程序中，有几种方法可以引用CesiumJS模块。您可以使用CommonJS语法或ES6*import*语句。

您可以导入整个CesiumJS库，或者只需要引入您需要的特定模块。引入模块将导致webpack只编译包中的那些模块及其依赖项，而不是整个库。

#### CommonJS style *require*
引入所有的CesiumJS：
```javascript
var Cesium = require('cesium/Cesium');
var viewer = new Cesium.Viewer('cesiumContainer');
```

引入独立模块
```javascript
var Color = require('cesium/Core/Color');
var color = Color.fromRandom();
```

#### ES6风格导入
引入所有的CesiumJS：
```javascript
import Cesium from 'cesium/Cesium';
var viewer = new Cesium.Viewer('cesiumContainer');
```

引入独立模块
```javascript
import Color from 'cesium/core/Color';
var color = Color.fromRandom();
```

#### Requiring asset files 引用asset文件
webpack背后的原理是，每个文件都被视为一个模块。这使得导入资产与包括javascript相同。我们告诉Webpack如何使用加载器加载配置中的每种类型的文件，所以我们只需要调用*require*。
```javascript
require('cesium/Widgets/widgets.css');
```

## Hello World!
创建一个新的文件，*src/css/main.css*，为了样式化我们的应用：
```javascript
html, body, #cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
```

创建一个div用于*index.html* body中的CesiumJS Viewer。替换*<p>Hello World!</p>*使用下面的div：
```javascript
<div id="cesiumContainer"></div>
```

删除*index.js*中的内容并包含*Cesium*和我们的CSS文件：
```javascript
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
```

为创建*Viewer*添加一行代码：
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
```

![](https://i.loli.net/2019/06/05/5cf7dc381acce70140.png)

使用*npm start*运行应用用于在浏览器中查看Viewer。

![](https://i.loli.net/2019/06/05/5cf7dc5148a5786386.png)

复制并粘贴你最喜欢的[Sandcastle](https://cesium.com/docs/tutorials/cesium-and-webpack/)例子。例如，[粒子系统实例](https://cesium.com/docs/tutorials/cesium-and-webpack/?src=Particle%20System%20Fireworks.html&label=Showcases)可以得出一个很好的结论。

## Advanced webpack configurations 高级webpack配置
webpack可以通过更多方式提高性能、减小包大小以及执行其他或复杂的构建步骤。在这里，我们将讨论一些与使用CesiumJS库相关的配置选项。
> 在*webpack.release.config.js*的仓库示例中可以找到优化生产Cesium webpack构建的配置。

### Code splitting 代码分割
默认情况下，webpack将CesiumJS打包在与我们的应用程序相同的块中，从而生成一个大文件。我们可以将CesiumJS拆分成自己的包，并使用**CommonChunksPlugin**提高我们的应用程序性能。如果你最终为你的应用程序创建了多个块，它们都可以引用一个常见的*cesium*块。

将插件添加到*webpack.config.js*文件中，并指定分解CesiumJS模块的规则：
```javascript
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'cesium',
            minChunks: module => module.context && module.context.indexOf('cesium') !== -1
        })
    ]
```

### Enable source maps 启用源映射
源映射允许Webpack将错误跟踪回原始内容。它们提供或多或少详细的调试信息，以换取编译速度。我们建议使用*'eval'*选项。
```javascript
    devtool: 'eval'
```
在生产产品中，不推荐使用源映射。

### Remove pragmas 移除编译指令
CesiumJS源代码中存在开发人员错误和警告，这些错误和警告已从我们的小型发布版本中删除。由于没有内置的Webpack方法来删除这些警告，因此我们将使用**strip-pragma-loader**。

安装包：
```javascript
npm install strip-pragma-loader --save-dev
```

在*module.rules*中将*debug*设为*false*，引入加载器：
```javascript
    rules: [{
        // Strip cesium pragmas
        test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, cesiumSource),
            use: [{
                loader: 'strip-pragma-loader',
                options: {
                    pragmas: {
                        debug: false
                    }
                }
            }]
    }]
```

### Uglify and minify 混淆与压缩
增删和缩小代码允许在生产中使用较小的文件大小。对于一个发布版本，CesumJS会修改JavaScript文件并缩小CSS文件。

使用**uglifyjs-webpack-plugin**用于混淆CesiumJS源代码。

```javascript
npm install uglifyjs-webpack-plugin --save-dev
```

在配置文件中引入他：
```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```

在插件列表中包含他：
```javascript
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
```

在**css-loader**上使用*minimize*选项用于优化CSS。
```javascript
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        // minify loaded css
                        minimize: true
                    }
                }
            ]
        }]
    }
```

## Resources 资源
官方的[cesium-webpack-example](https://github.com/AnalyticalGraphicsInc/cesium-webpack-example)仓库包含最小webpack配置、本教程中介绍的Hello World代码以及可选代码配置的说明。

有关要包含在新应用程序中的CesiumJS功能的教程，请参阅[Cesium Workshop教程](https://cesium.com/docs/tutorials/cesium-workshop)。

在[Sandcastle]中探索实例，并查看[CesiumJS文档](https://cesiumjs.org/refdoc/)

要了解有关webpack的更多信息，请查看[webpack概念](https://webpack.js.org/concepts/)，或[深入阅读文档](https://webpack.js.org/configuration/)。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/