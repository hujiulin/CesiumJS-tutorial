# Cesium入门3 - Cesium目录框架结构
# app目录
下载官网上的文件，我们能看到以下CesiumJS库结构：
- Source/: Cesium应用程序代码及数据
- ThirdParty/：外部依赖库，不同于Cesium的第三方库
- LICENSE.md：Cesium的License介绍
- index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库
- server.js：基于node.js的web服务应用

**备注**

cesiumJS与第三方JavaScript库和框架做了适配:

<a href="https://cesium.com/blog/2018/03/05/integrating-cesium-and-react/" target="_blank">React: Integrating Cesium with React</a>

<a href="https://cesium.com/blog/2017/10/23/integrating-cesium-with-threejs/" target="_blank">ThreeJS: Integrating Cesium with ThreeJS</a>

#页面结构
###引入CesiumJS
```javascript
<script src="ThirdParty/Cesium/Cesium.js"></script>
```

开发者也可以根据自己的需求，通过ThirdParty/Cesium/source/来挑选自己的依赖库，裁剪js的大小，


### HTML结构
需要一个div作为Cesium Viewer widget的容器
```html
<div id="cesiumContainer"></div>
```

 需要引入app.js来激活Cesium Viewer，app.js最好在HTML末尾引入。
```javascript
<script src="Source/App.js"></script>
```
 
### 添加CSS样式
需要引入Cesium viewer中的各种widget的样式
新建一个index.css，并引入到index.html中
```html
<link rel="stylesheet" href="index.css" media="screen">
```
 
在index.css中加入以下默认的Cesium CSS。
```html
@import url(ThirdParty/Cesium/Widgets/widgets.css);
```
 
# 操作步骤
1. 打开Source/App.js，删除contents
2. 拷贝Source/AppSkeleton.js到Source/App.js
3. 确认server.js在Cesium文件夹根目录，并运行server.js (npm server.js)
4. 在新版本（支持WebGL）的浏览器中输入localhost:8080

如果有任何问题：

完整代码：https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html&label=Showcases&gist=8d9d3daadd197cffd501d7210bcca3b6

推荐代码：https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html&label=Showcases&gist=113c3467755fc38d9f9bce16a94475fc

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/