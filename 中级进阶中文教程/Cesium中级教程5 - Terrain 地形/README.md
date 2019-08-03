# Cesium中级教程5 - Terrain 地形
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

CesiumJS支持对与水流相关的海洋、湖泊和河流以及全球高分辨率地形进行流式处理和可视化。查看山峰、山谷和其他地形特征，并拥抱三维数字地球。使用[Cesium ion](https://cesium.com/ion)流式化您自己的切片地形数据或高分辨率管理地形，如[Cesium World Terrain](https://cesium.com/content/cesium-world-terrain/)。

## Quick Start 快速入门
打开Sandcastle的[Hello World](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html)示例。默认情况下，地球球体是[WGS84 ellipsoid](http://earth-info.nga.mil/GandG/publications/tr8350.2/wgs84fin.pdf)。通过将*terrainProvider*选项传递给*Viewer*，指定不同的地形提供器。让我们使用Cesium世界地形：
```javascript
Cesium.Ion.defaultAccessToken = 'your_access_token';
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain()
});
```

NOTE: *创建Cesium账号* 
NOTE: 本教程使用Cesium ion提供的地形。创建一个帐户以获取访问令牌(access token)，以便在本教程中使用地形。[在这里注册](https://cesium.com/ion/signup?gs=true)，上面的示例代码将自动更新为您的令牌。如果您已经有帐户，[请登录](https://cesium.com/ion/signin)。

修改示例后，按F8运行该示例。缩放到山区，按住鼠标中键并拖动以倾斜到地平线视图。下图珠穆朗玛峰的样子：

![](https://i.loli.net/2019/05/22/5ce50eb02b33494801.png)

随着我们的缩放越来越近，CesiumJS基于地球上哪些部分可见以及它们离得有多远来获得更高分辨率的地形。

地形和图像分别处理，任何图像提供者都可以与任何地形提供者一起使用。请参见[Imagery Layers Tutorial](https://cesium.com/docs/tutorials/imagery-layers)以管理图像。

## 启用地形照明和水体效果
Cesium世界地形还包括地形照明数据和水体效果所需的海岸线数据。默认情况下，此数据不会随地形图块一起发送。若要启用地形照明，请将*requestVertexNormals*设为*true*并开启全球光照。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain({
        requestVertexNormals: true
    })
});
viewer.scene.globe.enableLighting = true;
```

下图是基于太阳位置开启地形照明的珠穆朗玛峰的同一个视图。

![](https://i.loli.net/2019/05/22/5ce50ec8a9c3651535.png)

使用*requestWaterMask*以类似的方式启用水体效果：
```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain({
        requestWaterMask: true
    })
});
```

缩放到有水的区域以查看效果。这里是旧金山湾：

![](https://i.loli.net/2019/05/22/5ce50ed67340b14275.png)

随着时间的推移，水波波动和明亮的镜面反射太阳和月亮的光。通过使用** Globe.oceanNormalMapUrl**用于创建波浪来自定义水效果。更改图像提供者也会影响水的外观，因为水的颜色与底层图像混合。改变图层提供器也会改变水体效果的呈现，因为水体的颜色会和底下的图层混合渲染。

请参阅Sandcastle的[地形示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain.html)，探索一些有趣的地形和水体效果区域。

## 准备流式化地形
[Cesium World Terrain](https://cesium.com/content/cesium-world-terrain/): 高分辨世界地形，同时扩展支持地形照明和水体效果。Cesium Worl Terrain支持通过Cesium ion在线访问，也支持付费下载，离线访问。将它加入到Cesium应用中，将快速提高地形可视化效果。 Cesium World Terrain也可以通过on-premise获得。

## Terrain providers 地形提供器
Cesium基于地形提供器支持请求地形的若干种方法。大多数地形提供器使用HTTP上的[REST接口](http://rest.elkstein.org/)来请求地形切片。地形提供器根据请求的格式和地形数据的组织方式而有所不同。CesiumJS支持以下地形提供器：

- **CesiumTerrainProvider**: 支持量化网格地形切片，针对地形流进行了优化。兼容Cesium ion所服务的地形和来自[3D tiling pipeline])(/3d-tiling-pipeline/terrain/)的输出数据。
- **GoogleEarthEnterpriseTerrainProvider**: 支持由您的[Google Earth Enterprise](https://github.com/google/earthenterprise)服务器生成的高程地图地形。
- **VRTheWorldTerrainProvider**:  支持从[VT MAK VR-TheWorld Server](http://vr-theworld.com/)服务器请求的高度地图地形图。
- **EllipsoidTerrainProvider**:按照程序创建椭球的表面。缺乏地形的真实外观，但不从服务器请求数据。

地形提供器的构造与[图层提供器](https://cesium.com/docs/tutorials/imagery-layers)类似，如果服务器不支持[跨域资源共享CORS](http://enable-cors.org/)，则通常包括地形服务器的URL和可选的代理。

## 资源
查看Sandcastle中的[地形示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain.html)和[所有地形提供器的参考文档](https://cesiumjs.org/Cesium/Build/Documentation/?classFilter=TerrainProvider)。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/