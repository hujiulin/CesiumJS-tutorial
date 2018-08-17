# Cesium入门11 - Interactivity - 交互性
最后，让我们添加一些鼠标交互。为了提高我们的geocache标记的可见性，当用户在标记上hovers时，我们可以改变它们的样式来突出显示。

为了实现这一点，我们将使用拾取pick，一种Cesium的特征，从3D场景中返回数据，在观看者画布上给出像素位置。

这里有以下几种不同的picking：

- [Scene.pick](https://cesiumjs.org/Cesium/Build/Documentation/Scene.html#pick) : 返回包含给定窗口位置的基元的对象。
- [Scene.drillPick](https://cesiumjs.org/Cesium/Build/Documentation/Scene.html#drillPick) : 返回包含给定窗口位置的所有原语的对象列表。
- [Globe.pick](https://cesiumjs.org/Cesium/Build/Documentation/Globe.html?classFilter=globe#pick) : 返回给定光线与地形的交点。

一下是一些picking操作的例子：
- [Picking Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Picking.html&label=Showcases)
- [3D Tiles Feature Picking Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Tiles%20Feature%20Picking.html&label=3D%20Tiles)

因为我们希望在hover触发我们的高亮效果，首先我们需要创建一个鼠标动作处理器。为此，我们将使用**ScreenSpaceEventHandler**在用户输入操作中触发指定函数的一组处理程序。**ScreenSpaceEventHandler.setInputAction()**监听用户行为类型**ScreenSpaceEventType**,并运行一个特定的函数，将用户操作传递为参数。这里，我们将传递一个以movement为输入的函数：
```javascript
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(movement) {}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

接下来让我们来写我们的高亮功能。处理程序将在鼠标movement中传递，从中我们可以提取一个窗口位置与**pick()**一起使用。如果拾取返回billboard对象，我们知道我们在一个标记上hovering。然后，使用我们了解的**Entity**样式，我们可以应用突出显示样式。

```javascript
// If the mouse is over a point of interest, change the entity billboard scale and color
handler.setInputAction(function(movement) {
    var pickedPrimitive = viewer.scene.pick(movement.endPosition);
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
    // Highlight the currently picked entity
    if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
        pickedEntity.billboard.scale = 2.0;
        pickedEntity.billboard.color = Cesium.Color.ORANGERED;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

这成功地触发了标记的高亮样式更改。但是，您会注意到，当我们移动光标时，标记保持突出。我们可以通过跟踪最后一个标记来修复，并恢复原来的样式。

这里是完整的功能，标记高亮显示和取消高亮工作：
```javascript
// If the mouse is over a point of interest, change the entity billboard scale and color
var previousPickedEntity = undefined;
handler.setInputAction(function(movement) {
    var pickedPrimitive = viewer.scene.pick(movement.endPosition);
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
    // Unhighlight the previously picked entity
    if (Cesium.defined(previousPickedEntity)) {
        previousPickedEntity.billboard.scale = 1.0;
        previousPickedEntity.billboard.color = Cesium.Color.WHITE;
    }
    // Highlight the currently picked entity
    if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
        pickedEntity.billboard.scale = 2.0;
        pickedEntity.billboard.color = Cesium.Color.ORANGERED;
        previousPickedEntity = pickedEntity;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```
就是这样！现在我们成功地添加了鼠标movement handler和标记实体的hover行为。
![](https://i.loli.net/2018/08/16/5b7522a7bda8e.jpg)

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/