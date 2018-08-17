# Cesium入门10 - 3D Tiles
我们团队有时把Cesium描述成一个真实世界数据的3D游戏引擎。然而，使用真实世界的数据比使用典型的视频游戏数据资料要困难得多，因为真实数据可能是难以置信的高分辨率，并且需要精确的可视化。幸运的是，Cesium 与开源社区合作开发了[3D Tiles](https://cesiumjs.org/2015/08/10/Introducing-3D-Tiles/)，这是一个[开放的规范](https://github.com/AnalyticalGraphicsInc/3d-tiles)，用于传输海量的异构三维地理空间数据集。

使用概念上类似于Cesium的terrain和imagery的流技术，3D Tiles 使得可以查看原本不能交互式查看的巨大的模型，包括建筑物数据集、CAD（或BIM）模型、点云和摄影测量模型。

- [The 3D Tiles Inspector](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Inspector.html&label=3D%20Tiles)  是一种在遮罩hood下提供查看能力的调试工具。

下面是一些展示不同格式的3D Tiles演示：
- [Photogrammetry Model](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Photogrammetry.html&label=3D%20Tiles)
- [Building Information Model](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20BIM.html&label=3D%20Tiles)
- [Point Cloud Model](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Point%20Cloud.html&label=3D%20Tiles)
- [All Formats](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Formats.html&label=3D%20Tiles)

在我们的应用中，我们将使用**Cesium3DTileset**通过展示纽约所有建筑物的全3D模型来为我们的可视化添加现实主义！这种纽约 tilese托管在Cesium Ion中，我们可以使用***IonResource.fromAssetId***添加它：
```javascript
// Load the NYC buildings tileset
var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(3839) }));
```

你可能注意到建筑物没有正确地定位在地平面上。幸运的是，它很容易修复。我们可以通过修改模型矩阵**modelMatrix**来调整tileset的位置。

我们可以通过将tileset的边界球转换成地图**Cartographic**，然后添加期望的偏移量并重置模型矩阵，从地面找到模型**modelMatrix**的当前偏移量。
```javascript
// Adjust the tileset height so its not floating above terrain
var heightOffset = -32;
city.readyPromise.then(function(tileset) {
    // Position tileset
    var boundingSphere = tileset.boundingSphere;
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
});
```

现在在我们的场景中有110万个建筑模型流。

3D Tiles 还允许我们使用3D Tiles styling语言 来调整我们的样式。3D Tiles 样式定义了用于评估颜色（RGB和透明度）的表达式，并显示了**Cesium3DTileFeature**特征的属性，这是tileset的一部分，例如城市中的单个建筑物。样式通常基于存储在瓦片的批处理表中的特征属性。特征属性可以是高度、名称、坐标、构造日期等任何东西，但被构建到tileset asset 中。样式是用JSON定义的，而表达式是在JavaScript的小子集中编写的，用于样式化。此外，样式语言提供了一组内置函数来支持常见的数学运算。

一个**Cesium3DTilesetStyle**的例子如下：
```javascript
var defaultStyle = new Cesium.Cesium3DTileStyle({
    color : "color('white')",
    show : true
});
```

上述代码使我们NYC的tileset是白色并且总是可见的。为了实际设置tileset的样式，我们设置**city.style**:
```javascript
city.style = defaultStyle;
```
![](https://i.loli.net/2018/08/16/5b751e5b9b7c1.jpg)

我们还可以定义许多我们喜欢的样式。比如，让建筑变透明：
```javascript
var transparentStyle = new Cesium.Cesium3DTileStyle({
    color : "color('white', 0.3)",
    show : true
});
```
![](https://i.loli.net/2018/08/16/5b751e7322d12.jpg)

在我们的tileset中使用相同的样式来达到每一个特征只是皮毛工作。我们还可以使用特定于每个特征的属性来确定造型。下面是一个基于建筑物高度的建筑物颜色的例子：
```javascript
var heightStyle = new Cesium.Cesium3DTileStyle({
    color : {
        conditions : [
            ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
            ["${height} >= 200", "rgb(102, 71, 151)"],
            ["${height} >= 100", "rgb(170, 162, 204)"],
            ["${height} >= 50", "rgb(224, 226, 238)"],
            ["${height} >= 25", "rgb(252, 230, 200)"],
            ["${height} >= 10", "rgb(248, 176, 87)"],
            ["${height} >= 5", "rgb(198, 106, 11)"],
            ["true", "rgb(127, 59, 8)"]
        ]
    }
});
```
![](https://i.loli.net/2018/08/16/5b751e8e8a9f6.jpg)

为了在样式间交换，我们可以添加更多的代码来侦听HTML输入：
```javascript
var tileStyle = document.getElementById('tileStyle');
function set3DTileStyle() {
    var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
    if (selectedStyle === 'none') {
        city.style = defaultStyle;
    } else if (selectedStyle === 'height') {
        city.style = heightStyle;
    } else if (selectedStyle === 'transparent') {
        city.style = transparentStyle;
    }
}

tileStyle.addEventListener('change', set3DTileStyle);
```
更多关于3D Tiles的例子、如何使用及调整样式，请查看[the 3D Tiles sandcastle demos](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html&label=3D%20Tiles)。

3D Tiles例子：
- [Formats](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Formats.html&label=3D%20Tiles)
- [Photogrammetry Model](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Photogrammetry.html&label=3D%20Tiles)
- [Feature Styling](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Feature%20Styling.html&label=3D%20Tiles)

如果你有数据，需要帮助将其转换为3D瓦片，请继续关注关于Cesium Ion平台的更新！[在这里订阅更新](https://cesium.com/)。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/