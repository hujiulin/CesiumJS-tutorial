# Cesium入门6 - Adding Imagery - 添加图层
Cesium应用程序另一个关键元素是Imagery(图层)。瓦片图集合根据不同的投影方式映射到虚拟的三维数字地球表面。依赖于相机指向地表的方向和距离，Cesium会去请求和渲染不同层级的图层详细信息。

多种图层能够被添加、移除、排序和适应到Cesium中。

Cesium提供了一系列方法用于处理图层，比如颜色自适应，图层叠加融合。一些样例代码如下：

- [Adding basic imagery添加基本图层](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers.html)
- [Adjusting imagery colors自适应图层颜色](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Adjustment.html)
- [Manipulating and ordering imagery layers控制调整图层顺序](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers%20Manipulation.html)
- [Splitting imagery layers切割图层](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Imagery%20Layers%20Split.html)

Cesium提供了各种**[接口](https://cesiumjs.org/Cesium/Build/Documentation/index.html?classFilter=ImageryProvider)**支持各样的图层数据源。

**支持的图层格式**
1. wms
2. TMS
3. WMTS (with time dynamic imagery)
4. ArcGIS
5. Bing Maps
6. Google Earth
7. Mapbox
8. OpenStreetMap

***注意：不同的数据源需要不同的认证 - 需要确保自己能够有权限访问到这些数据源，自然地需要注册特定的认证才可以***

默认地，Cesium使用Bing Maps作为默认的图层。这个图层被打包进Viewer中用于演示。Cesium需要您自己创建**<a href="/topic/153.html" target="_blank">ion account</a>**然后生成一个access key用于访问图层数据。

在接下来的例子中，将使用Cesium ion中的Sentinel-2图层。

1. 去Cesium ion页面，将Sentinel-2图层加入到自己的assets中。点击在导航栏中点击[“Asset Depot”](https://cesium.com/ion/assetdepot/3954)
![](https://i.loli.net/2018/08/14/5b72806f29a29.png)

2. 点击“Add to my assets”。Sentinel-2将在你个人用户中的asset列表（My Assets）中出现，此时将在个人的app中图层数据源变得可用。

3. 代码级别：我们创建一个**IonImageryProvider**，将***assetId***传给对应的Sentinel-2图层。然后我们将**ImageryProvider**添加到**viewer.imageryLayers**。

```javascript
// Remove default base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

// Add Sentinel-2 imagery
viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId : 3954 }));
```
基于上述的代码，我们的Cesium应用程序在缩进zoom in的时候会看到如下图层：
![](https://i.loli.net/2018/08/14/5b728084c2e52.jpg)

***关于图层的更多信息：请访问[Imagery Layers Tutorial](https://cesiumjs.org/tutorials/Imagery-Layers-Tutorial/)***

**Cesium中文网交流QQ群：807482793**