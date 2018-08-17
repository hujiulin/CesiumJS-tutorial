# Cesium入门2 - Cesium环境搭建及第一个示例程序
# 验证浏览器
Cesium需要浏览器支持WebGL，可以通过CesiumJS官网提供的一个HelloWorld例子来测试自己的浏览器是否支持Cesium。（推荐使用Chrome）
测试地址：
https://cesiumjs.org/Cesium/Apps/HelloWorld.html

# 选择IDE
官网中写到：
```javascript
If you’re already a seasoned developer, you most likely have a favorite editor or development environment; for example, most of the Cesium team uses Eclipse. If you’re just starting out, a great free and open-source editor is Notepad++, which you can download from their website. Ultimately any text editor will do, so go with the one that you are most comfortable with.
```
如果你已经是一个经验丰富的开发人员，你很可能有一个最喜欢的编辑器或开发环境; 例如，大多数Cesium团队使用Eclipse。如果你刚刚开始，一个伟大的免费和开源的编辑器是Notepad ++，你可以从他们的网站下载。最终任何文本编辑器都会做，所以去与你最舒适的。

我个人之前开发PHP较多，所以我使用的是PHPStorm，其实我不推荐Eclipse，我比较推荐和Idea一母同胞的WebStorm。考虑到工程和文件夹的管理，我也不推荐Notepad++，轻量级的IDE我比较推荐Sublime Text.

# 下载Cesium源代码
最新的release版本代码下载地址：
https://cesiumjs.org/tutorials/cesium-up-and-running/

下载后，将zip文件解压到您选择的新目录中，我将在整个教程中将此文件称为Cesium root目录。内容应该看起来像下面。

![](https://i.loli.net/2018/08/09/5b6ba8d604af3.png)

直接点击index.html是无效的，需要放入Web Server容器中，才能运行起来。

# Server端
Cesium是纯前端的代码，官方给出的源代码中，配套了nodejs的server端，以及可以通过nodejs进行安装部署。实际上可以将Cesium部署进入tomcat（geoserver）、apache、nginx等服务器中。

官网推荐的是nodejs

1.	从官网中下载Node.js(https://nodejs.org/en/), 实际上nodejs有一些参数可是配置，使用默认的参数即可。.
2.	在Cesium所在的文件夹目录，打开cmd或者bash敲入命令
```shell
npm install 
```

下载依赖的npm模块，比如express等。如果成功，会在Cesium文件夹中床架 ‘node_modules’文件夹。
3.	最后在cmd或者bash中执行 
	```shell
	node server.js 
	```
	或者
	```shell
	npm start
	```

4.	成功之后能看到如下的截图
![](https://i.loli.net/2018/08/09/5b6ba8e97eb7a.png)

控制台会显示：
```shell
Cesium development server running locally.  Connect to http://localhost:8080
```

**备注**：不能关闭控制台，保持一直运行状态。打开浏览器，输入 http://localhost:8080 即可访问Cesium.

# 如果你不想用nodejs
Cesium是一个开源项目，GitHub上的下载地址为：https://github.com/AnalyticalGraphicsInc/cesium
最简单的安装方式，就是普通的JS文件加载，只需要从Github中下载其js代码，放到自己的项目中，在html页面中引用即可。如下：
![](https://i.loli.net/2018/08/09/5b6bab21eccce.png)

新建一个**helloworld.html**:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello 3D Earth</title>
    <script src="CesiumUnminified/Cesium.js"></script>
    <style>
        @import url(CesiumUnminified/Widgets/widgets.css);
        html, body, #cesiumContainer {
            width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="cesiumContainer"></div>
    <script src="app.js"></script>
</body>
</html>
```
新建一个**app.js**
```javascript
viewer = new Cesium.Viewer('cesiumContainer');
```
其中cesiumContainer为html中的地图显示div的id。就是这么简单，浏览器打开上述html页面，便可看到一个三维地球。底图为微软影像只是加载到了三维地球上，包含放大、缩小、平移等基本在线地图功能，同时还包含了时间轴等与时间有关的控件，这是Cesium的一个特色，其地图、对象以及场景等能与时间相关联。

# 本地的Hello World程序
现在本地的node服务已经运行起来，打开浏览器，输入：http://localhost:8080/Apps/HelloWorld.html.
能看到和官方一模一样的hello wolrd 三维数字地球。
![](https://i.loli.net/2018/08/09/5b6ba8f93f61e.png)

# hello World代码分析
官网hello world代码如下：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use correct character set. -->
  <meta charset="utf-8">
  <!-- Tell IE to use the latest, best version. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- Make the application on mobile take up the full browser screen and disable user scaling. -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>Hello World!</title>
  <script src="../Build/Cesium/Cesium.js"></script>
  <style>
      @import url(../Build/Cesium/Widgets/widgets.css);
      html, body, #cesiumContainer {
          width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
      }
  </style>
</head>
<body>
  <div id="cesiumContainer"></div>
  <script>
    var viewer = new Cesium.Viewer('cesiumContainer');
  </script>
</body>
</html>
```
以下四个步骤将Cesium加入到html中：
1. 引入Cesium.js， 该javascript定义了Cesium object
```javascript
<script src="../Build/Cesium/Cesium.js"></script>
```
2. 导入Cesium Viewer widget的样式
```javascript
@import url(../Build/Cesium/Widgets/widgets.css);
```
3. cesium view存在于该div中
```javascript
<div id="cesiumContainer"></div>
```
4. 最终创建cesium viewer
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
```

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/