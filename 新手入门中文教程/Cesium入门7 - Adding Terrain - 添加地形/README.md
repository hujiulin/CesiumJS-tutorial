# Cesium入门7 - Adding Terrain - 添加地形
Cesium支持流式的、可视化的全球高程投影地形地势、水形数据，包括海洋、湖泊、河流、山峰、峡谷和其他能够被三维展示出来的且效果比二维好的地形数据。像图层数据一样，Cesium引擎会从一个服务器上请求流式地形数据，仅请求那些基于当前相机能看到的需要绘制的图层上的数据。

Cesium官方提供了一些地形数据集的例子，以及如何配置这些参数。
- [ArcticDEM](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=ArcticDEM.html&label=Showcases) : 高投影的arctic terrain
- [PAMAP Terrain](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=PAMAP%20Terrain.html&label=Showcases) : 高投影的Pennsylvania terrain
- [Terrain display options](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain.html&label=Showcases) : 一些地形数据配置和格式
- [Terrain exaggeration](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain%20Exaggeration.html&label=Showcases) : 是地形间的高度差异更加的优雅艺术

**支持的地形数据格式**
- [Quantized-mesh](https://github.com/AnalyticalGraphicsInc/quantized-mesh), Cesium团队自己开源的一种格式
- Heightmap
- Google Earth Enterprise

为了添加地形数据，我们需要创建一个**CesiumTerrainProvider**，提供一个url和一些配置想，然后将这个provider赋值给**viewer.terrainProvider**。

此处，我们使用[Cesium WorldTerrian](https://cesium.com/blog/2018/03/01/introducing-cesium-world-terrain/)图层，该图层由Cesium ion提供，在“My Assets”中是默认提供的。我们可以用**createWorldTerrain**helper函数创建一个由Cesium ion提供服务的[Cesium WorldTerrian](https://cesium.com/blog/2018/03/01/introducing-cesium-world-terrain/)。
```javascript
// Load Cesium World Terrain
viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask : true, // required for water effects
    requestVertexNormals : true // required for terrain lighting
});
```

***requestWaterMask***和***requestVertexNormals***是可选的配置项，告诉Cesium是否需要请求额外的水、光数据。这两个选项默认是设为false的。

最终，既然我们有了地形数据，我们需要更多的线条来使得地形数据背后的objects能够正确地显示，只有最前面、最上面的objects才能是可见的。
```javascript
// Enable depth testing so things behind the terrain disappear.
viewer.scene.globe.depthTestAgainstTerrain = true;
```
我们现在有地形数据和运动的水。纽约非常平坦，所以可以在上面的地形数据上自由的探索。举一个显而易见的例子，你可以跳转到更加崎岖的区域比如 Grand Canyon 或者 San Francisco。

![](https://i.loli.net/2018/08/14/5b728a65d7e08.jpg)

***关于地形数据的更多信息，请访问[Terrain Tutorial](https://cesiumjs.org/tutorials/Terrain-Tutorial/)***

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/