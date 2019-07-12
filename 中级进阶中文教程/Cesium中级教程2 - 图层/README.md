# Cesium中级教程2 - 图层
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

Cesium支持从几个标准服务绘制和添加高分辨率图像（地图）图层。图层可以按顺序排列，并混合在一起。每一层的亮度、对比度、伽玛、色调和饱和度可以动态地改变。本节教程介绍了图层的概念以及相关的Cesuim APIs。

## 快速入门
我们暂时忽略细节，直接编写代码来添加一些图像层。在[Sandcastle](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html)中打开Hello World示例。此示例创建一个**Viewer**组件，默认情况下，该组件呈现Bing Maps图层。我们可以通过向**Viewer**构造函数提供附加参数来指定不同的基础图层。让我们使用来自[Esri ArcGIS MapServer](http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer)的图层：

```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker : false
});
```

修改样例后，按F8来运行：

![](https://i.loli.net/2018/12/21/5c1c8b504285c.png)

我们可以通过滑动鼠标滚轮放缩，来看到实际的图层流的变化。

接下来, 添加另一个图层: [NASA Black Marble imagery](http://earthobservatory.nasa.gov/Features/NightLights/) 基于 [Tile Map Service](https://cesiumjs.org/Cesium/Build/Documentation/TileMapServiceImageryProvider.html) (TMS):

```javascript
var layers = viewer.scene.imageryLayers;
var blackMarble = layers.addImageryProvider(new Cesium.createTileMapServiceImageryProvider({
    url : '//cesiumjs.org/tilesets/imagery/blackmarble',
    maximumLevel : 8,
    credit : 'Black Marble imagery courtesy NASA Earth Observatory'
}));
```

![](https://i.loli.net/2018/12/21/5c1c8b620f9cf.png)

因为黑色大理石层是最后加上的一层，覆盖了整个地球，所以黑色大理石图层覆盖了 Esri图层。我们可以把黑色大理石图层移到底部**layers.lower(blackMarble);**，但是为了让我们能更好地理解这两层之间的关系，让我们把它和Esri图层混合：
```javascript
blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.
```
![](https://i.loli.net/2018/12/21/5c1c8b789c609.png)

下一步，调高灯光的亮度：
```javascript
blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.
```

![](https://i.loli.net/2018/12/21/5c1c8b8d504a3.png)

最后，添加一个单独的图像作为第三层作为特定的扩展。
```javascript
layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url : '../images/Cesium_Logo_overlay.png',
    rectangle : Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
}));
```

![](https://i.loli.net/2018/12/21/5c1c8ba349805.png)

完整代码如下：
```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker : false
});

var layers = viewer.scene.imageryLayers;
var blackMarble = layers.addImageryProvider(new Cesium.createTileMapServiceImageryProvider({
    url : '//cesiumjs.org/tilesets/imagery/blackmarble',
    maximumLevel : 8,
    credit : 'Black Marble imagery courtesy NASA Earth Observatory'
}));

blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.

blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.

layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url : '../images/Cesium_Logo_overlay.png',
    rectangle : Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
}));
```
在Sandcastle中查看[完整样例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers.html)



## 现有的图层
[ion Assets tab in Sandcastle](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Sentinel-2.html&label=ion%20Assets)包含由Cesiumion托管的图层应用，可以在Cesium的应用中添加几行代码来使用图层服务。

## ImageryProvider
上面使用的前两层这样的高分辨率图像太大，无法放入内存，甚至无法放入单个磁盘，因此图像被划分为较小的图像，称为tiles（瓦片），可以根据视图将图像流传输到客户端。Cesium支持使用ImageryProvider请求瓦片图的几种标准。大多数ImageryProvider使用HTTP上的REST接口来请求瓦片图。ImageryProvider根据请求的格式和组织方式的不同而不同。Cesium内置以下ImageryProvider：
- Web Map Service (WMS) - OGC标准，用于从分布式地理空间数据库中请求地理区域的地图块。在Cesium中，请参见[WebMapServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/WebMapServiceImageryProvider.html)。
- Tile Map Service (TMS) - 访问瓦片图的Rest接口。瓦片图被转换为[MapTiler](http://www.maptiler.org/)或[GDAL2Tiles](http://www.klokan.cz/projects/gdal2tiles/).参见[TileMapServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/TileMapServiceImageryProvider.html)。
- OpenGIS Web Map Tile Service (WMTS) - 一个OGC标准，用于在互联网上提供预先绘制的地理参考瓦片图。在Cesium中，请参见[WebMapServiceImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/WebMapTileServiceImageryProvider.html)。
- OpenStreetMap - 访问OpenStreetMap瓦片图或任何Slippy瓦片图。有几种方式可以[host these tiles](http://switch2osm.org/serving-tiles/) 在Cesium中，请参加[createOpenStreetMapImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/createOpenStreetMapImageryProvider.html)。
- Bing Maps - 使用[Bing Maps REST Services](http://msdn.microsoft.com/en-us/library/ff701713.aspx)访问瓦片图。 在https://www.bingmapsportal.com/创建Bing地图的keys。在Cesium中, 请参见[BingMapsImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/BingMapsImageryProvider.html)。
- Esri ArcGIS MapServer - 使用[ArcGIS Server REST API](http://resources.esri.com/help/9.3/arcgisserver/apis/rest/)来访问ArcGIS MapServer上的瓦片图. 在Cesium中,请参见[ArcGisMapServerImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/ArcGisMapServerImageryProvider.html)。
- Google Earth Enterprise - 提供对存储Google Earth Enterprise服务器中的图层的访问。在Cesium中，请参见[GoogleEarthImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/GoogleEarthImageryProvider.html)。
- Mapbox - 使用[Mapbox API](https://www.mapbox.com/developers/api/)访问瓦片图. 创建一个账户并提供[access token](https://www.mapbox.com/account/apps/). 在Cesium中, 请参见[MapboxImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/MapboxImageryProvider.html)。
- Standard image files - 从图片中创建图层。在Cesium中, 请参见[SingleTileImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/SingleTileImageryProvider.html)。
- Custom tiling schemes - 使用[UrlTemplateImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/UrlTemplateImageryProvider.html),通过使用URL模板，我们可以连接到大量图像源。 例如, TMS的url模板是 //cesiumjs.org/tilesets/imagery/naturalearthii/{z}/{x}/{reverseY}.jpg.
- Tile coordinates - 通过绘制每个瓦片图周围的边界并用其水平、X和Y坐标标记它，显示如何在特定的瓦片方案中将地球划分为多个瓦片图。



我们可以通过实现[ImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/ImageryProvider.html)接口来访问其他图层服务。如果你这样做，并认为它是普遍有用的，请[贡献](https://github.com/AnalyticalGraphicsInc/cesium/wiki/Contributor%27s-Guide)给Cesium为每个人的利益。



查看[参考文档](https://cesiumjs.org/Cesium/Build/Documentation/?classFilter=ImageryProvider)以了解如何构建特定的imagery provider。我们可以查看[SingleTileImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/SingleTileImageryProvider.html)因为很多imagery providers共享它的构造属性：

- **url** -图像的url。像许多imagery provider，这是惟一需要的属性。在其他imagery providers中，这个url指向服务器或服务的根url。
- **extent** - 可选参数，图像应该覆盖的经纬度矩形。默认情况是覆盖整个地球。
- **credit** - 可选参数，数据源的字符证书, 将显示到canvas上。 一些imagery providers, 比如 [BingMapsImageryProvider](https://cesiumjs.org/Cesium/Build/Documentation/BingMapsImageryProvider.html) 和 [ArcGIS Server REST API](http://resources.esri.com/help/9.3/arcgisserver/apis/rest/), 可以直接从他们的服务获取字符证书或logo。
- **proxy** - 可选参数，用于请求服务的代理，可以带给我们跨域共享资源。

## 跨域资源共享
基于安全考量，今天的Web浏览器会努力防止Javascript代码读取来自不同站点的图像像素。特别是，如果像Cesium这样的WebGL应用程序，访问来自不同的主机名或端口，并且服务器不显式地允许以这种方式使用图像，则禁止将图像用作纹理。服务器指示图像不包含机密信息，因此通过在HTTP响应中包括跨源资源共享(CORS)头部，其他站点读取它们的像素是安全的。

不幸的是，并非所有的图像服务都支持CORS。对于那些不是，必须使用与托管Cesium的网站同源的代理服务器。当使用这种代理时，对于Web浏览器和Cesium客户机来说，tile就好像它们来自与基于Cesium的网站相同的起源一样。若要与图像提供程序一起使用代理，请在构造图像提供程序时使用代理属性。Cesium包含一个用Node.js编写的用于开发的简单代理。

```javascript
layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
    url : '//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
    proxy : new Cesium.DefaultProxy('/proxy/')
}));
```

如果您正在托管公共图层，我们鼓励启用本文所述的CORS，而不是使用代理。

## ImageryProvider与图层
到目前为止，我们还没有明确区分ImageryProvider和图层。ImageryProvider使用特定服务请求图层，而图层表示来自ImageryProvider的显示图层。代码如下：
```javascript
var layer = layers.addImageryProvider(imageryProvider);
```
是下列代码的简写
```javascript
var layer = new ImageryLayer(imageryProvider);
layers.add(layer);
```

我们通常构造一个imagery provider仅用于创建一个图层，然后我们利用他的属性，例如**show**, **alpha**, **brightness**和**contrast**。参见[ImageryLayer](https://cesiumjs.org/Cesium/Build/Documentation/ImageryLayer.html)。将imagery provider和图层解耦使得添加新的imagery provider变得容易。

像上面例子中的**layers**一样，图层集合确定绘制层的顺序。根据添加的顺序从下到上绘制图层。像Cesium中任何其他集合一样，使用**add**、**remove**和**get**等函数对图层集合进行操作。此外，可以使用**raise**、**raiseToTop**、**lower**和**lowerToBottom**对层进行重新排序。参见[ImageryLayerCollection](https://cesiumjs.org/Cesium/Build/Documentation/ImageryLayerCollection.html)。

## 资源
可以从Sandcastle中获得imagery layers:
- [Imagery Layers](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers.html) - 教程中的代码样例
- [Imagery Layers Manipulation](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers%20Manipulation.html) - 从多数据源中获得的图层，支持独立的透明度调整。
- [Imagery Adjustment](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Adjustment.html) - 调整图层的brightness, contrast, gamma, hue和saturation。

另外可以获得参考文档：
- [All imagery providers](https://cesiumjs.org/Cesium/Build/Documentation/?classFilter=ImageryProvider)
- [ImageryLayer](https://cesiumjs.org/Cesium/Build/Documentation/ImageryLayer.html)
- [ImageryLayerCollection](https://cesiumjs.org/Cesium/Build/Documentation/ImageryLayerCollection.html)

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/