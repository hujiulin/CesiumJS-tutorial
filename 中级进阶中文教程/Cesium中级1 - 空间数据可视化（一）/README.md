# Cesium入门1 - Cesium介绍
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

本教程将教读者如何使用Cesium的实体（Entity）API绘制空间数据，如点、标记、标签、线、模型、形状和物体。不需要Cesium的先验知识，但是如果读者完全没有这方面的经验，那么读者可能希望从[“新手入门中文教程（原创）”]( http://cesiumcn.org/getstart.html)开始学习。
##什么是实体（Entity）API？
Cesium具有丰富的用于空间数据的API，可以分为两类：面向图形开发人员的低级API（通常称为原始(Primitive)API）和用于数据驱动的可视化的高级API（称为实体(Entity)API）。

原始API的主要目标是暴露手头执行任务所需的最小抽象量。它希望我们像图形程序员一样思考，并使用图形术语。它的结构是为给定的可视化类型提供最有性能和灵活性的实现，而不是为了API的一致性。加载一个模型不同于创建一个广告牌，两者都与创建多边形完全不同。每种类型的可视化都有其独特的特征。此外，它们各自具有不同的性能特征，并且需要遵循不同的最佳实践。虽然它功能强大且灵活，但大多数应用程序都比Primitive API提供的抽象级别更高。原始API的主要目标是开放手头当前研发工作的所需的最小抽象量。它希望我们像图形程序员一样思考，并使用图形术语。**它的结构是为给定的可视化类型提供最有性能和灵活性的实现，而不是为了API的一致性**。加载一个模型不同于创建一个广告牌（Billboard ），两者都与创建多边形完全不同。每种类型的可视化都有其独特的特征。此外，它们各自具有不同的性能特征，并且需要遵循不同的最佳实践。虽然它功能强大且灵活，但大多数应用程序都提供比Primitive API的抽象级别更高的服务接口。

实体API的目的是公开一组设计一致的高级对象，这些对象将相关的可视化和信息聚合到一个统一的数据结构中，我们称之为实体。它让我们专注于展示我们的数据，而不是担心可视化的潜在机制。它还提供了易于构建复杂的、时间动态可视化的构造，这种可视化方式与静态数据自然相适应。虽然实体API实际上在背后使用了原始API(Primitive API)，但这是我们（几乎）永远不必关注的实现细节。通过将各种启发式应用到我们提供的数据，实体API能够提供灵活的、高性能的可视化，同时公开一致的、易于学习和易于使用的接口。

##我们的第一个实体
学习实体API的基本方法之一是通过查看一些代码。为了让事情简单化，我们将在CesiumSandcastle的[Hello World]( https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html&label=Showcases)例子中构建。如果读者在本地开发Cesium，可以自由地使用自己的应用程序。

假设我们想从经度和纬度的列表中添加一个美国州怀俄明的多边形。（怀俄明之所以被选中是因为它是一个简单的多边形）我们可以把下面的代码复制粘贴到Sandcastle去做：
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');

var wyoming = viewer.entities.add({
  name : 'Wyoming',
  polygon : {
    hierarchy : Cesium.Cartesian3.fromDegreesArray([
                              -109.080842,45.002073,
                              -105.91517,45.002073,
                              -104.058488,44.996596,
                              -104.053011,43.002989,
                              -104.053011,41.003906,
                              -105.728954,40.998429,
                              -107.919731,41.003906,
                              -109.04798,40.998429,
                              -111.047063,40.998429,
                              -111.047063,42.000709,
                              -111.047063,44.476286,
                              -111.05254,45.002073]),
    height : 0,
    material : Cesium.Color.RED.withAlpha(0.5),
    outline : true,
    outlineColor : Cesium.Color.BLACK
  }
});

viewer.zoomTo(wyoming);
```
点击运行按钮（或者F8）能看到下面的图像：
 
![](https://i.loli.net/2018/11/01/5bdabb34bd61a.jpg)
 
因为我们的一个目标是让Cesium的代码易于理解，希望这是不言自明的。我们创建了[Viewer widget]( https://cesiumjs.org/Cesium/Build/Documentation/Viewer.html)，它充当几乎所有Cesium应用程序的基础，然后通过[viewer.entities.add]( https://cesiumjs.org/Cesium/Build/Documentation/EntityCollection.html#add). 添加一个新的[Entity]( https://cesiumjs.org/Cesium/Build/Documentation/Entity.html)。我们传递的需[add]( https://cesiumjs.org/Cesium/Build/Documentation/EntityCollection.html#add)的对象只是一个提供初始值的选项参数。返回值是实际的实体实例。最后，我们调用 [viewer.zoomTo]( https://cesiumjs.org/Cesium/Build/Documentation/EntityCollection.html#zoomTo) 以确保实体处于视图中。
有很多实体选项可用，但是现在我们指定[polygon]( https://cesiumjs.org/Cesium/Build/Documentation/PolygonGraphics.html)内部的半透明红色和边界的黑色轮廓。我们也给实体一个“Wyoming 怀俄明”的显示名称。

##形状和物体
有了创建多边形的基本知识，并且由于实体API的同质性，我们现在可以通过简单地使用[Sandcastle]( https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html&label=Showcases)中的示例作为参考来创建各种图形。下面是支持的形状和物体的完整列表。
![](https://i.loli.net/2018/11/01/5bdabf6bc454d.png)

###材质和轮廓
不管它们的几何定义如何，所有形状和物体都有一组共同的属性来控制它们的外观。`fill`属性是一个布尔值，它指定是否填充了表面的内部，而`outline`属性控制形状的边缘是否被轮廓化。
当`fill`设为`true`，`material`属性决定填充物是什么。在接下来的例子中，让我们创建一个半透明的蓝色椭圆。默认情况下，`fill`是`true`，`outline`是`false`，所以我们只需要指定`material`。
```javascript
var entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse : {
    semiMinorAxis : 250000.0,
    semiMajorAxis : 400000.0,
    material : Cesium.Color.BLUE.withAlpha(0.5)
  }
});
viewer.zoomTo(viewer.entities);

var ellipse = entity.ellipse; // For upcoming examples
```


Image
我们也可以将材质指定为一个图片链接：
```javascript
ellipse.material = '//cesiumjs.org/tutorials/images/cats.jpg';
```
![](https://i.loli.net/2018/11/01/5bdabb8a7da4e.jpg)

在上述两种情况下，在赋值时自动为我们创建一个[ColorMaterialProperty](https://cesiumjs.org/Cesium/Build/Documentation/ColorMaterialProperty.html)属性或[ImageMaterialProperty](https://cesiumjs.org/Cesium/Build/Documentation/ImageMaterialProperty.html)属性。对于更复杂的材料，我们需要自己创建一个材料属性实例。目前，实体形状和物体支持颜色、图像、棋盘、条纹和网格材料。
###棋盘
```javascript
ellipse.material = new Cesium.CheckerboardMaterialProperty({
  evenColor : Cesium.Color.WHITE,
  oddColor : Cesium.Color.BLACK,
  repeat : new Cesium.Cartesian2(4, 4)
});
```
![](https://i.loli.net/2018/11/01/5bdabc643b5e5.jpg)
###条纹
```javascript
ellipse.material = new Cesium.StripeMaterialProperty({
  evenColor : Cesium.Color.WHITE,
  oddColor : Cesium.Color.BLACK,
  repeat : 32
});
```
![](https://i.loli.net/2018/11/01/5bdabc82519a8.jpg)
###网格
```javascript
ellipse.material = new Cesium.GridMaterialProperty({
  color : Cesium.Color.YELLOW,
  cellAlpha : 0.2,
  lineCount : new Cesium.Cartesian2(8, 8),
  lineThickness : new Cesium.Cartesian2(2.0, 2.0)
});
```
![](https://i.loli.net/2018/11/01/5bdabc9c573f7.jpg)
###轮廓
与`fill`属性不同，`outline`没有相应的材料，而是依赖于两个独立的`outlineColor`和`outlineWidth`属性。`outlineWidth`只适用于非Windows系统，如Android、iOS、Linux和OS X。这是由于WebGL是如何在Windows上的所有三个主要浏览器引擎中实现所限制的。
```javascript
ellipse.fill = false;
ellipse.outline = true;
ellipse.outlineColor = Cesium.Color.YELLOW;
ellipse.outlineWidth = 2.0;
```
![](https://i.loli.net/2018/11/01/5bdabcc9aebc6.jpg)
###折线
折线是一种特殊情况，因为它们没有填充或轮廓属性。相反，他们依靠专门的材料来代替颜色。由于这些特殊材料，不同宽度和轮廓宽度的折线将对所有系统起作用。
```javascript
var entity = viewer.entities.add({
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray([-77, 35,
                                                        -77.1, 35]),
    width : 5,
    material : Cesium.Color.RED
}});
viewer.zoomTo(viewer.entities);

var polyline = entity.polyline // For upcoming examples
```
![](https://i.loli.net/2018/11/01/5bdabced87001.jpg)
###折线轮廓
```javascript
polyline.material = new Cesium.PolylineOutlineMaterialProperty({
    color : Cesium.Color.ORANGE,
    outlineWidth : 3,
    outlineColor : Cesium.Color.BLACK
});
```
![](https://i.loli.net/2018/11/01/5bdabd0b032fc.jpg)
###折现光晕
```javascript
polyline.material = new Cesium.PolylineGlowMaterialProperty({
    glowPower : 0.2,
    color : Cesium.Color.BLUE
});
```
![](https://i.loli.net/2018/11/01/5bdabd265a9bf.jpg)
##高度与挤压
覆盖在地球上的所有形状，当前是圆、椭圆、多边形和矩形，也可以放置在海拔高度或挤压成一个物体。在这两种情况下，形状或物体仍然符合其下方的地球曲率。

对于高度，我们所要做的就是在相应的图形对象上设置高度属性，对于上面列出的所有形状都是一样的。这可能是提到Cesium总是使用**米、弧度和秒作为单位**的好时机，除非函数明确地表示了其他情况，比如[Cartesian3.fromDegrees](https://cesiumjs.org/Cesium/Build/Documentation/Cartesian3.html#fromDegrees)。下面的代码行将多边形提升到地球上方250000米处。
```javascript
wyoming.polygon.height = 250000;
```
![](https://i.loli.net/2018/11/01/5bdabd47871a8.jpg)
将形状挤压成物体同样容易，我们只需要设置`extrudedHeight `属性。物体将在`height`和`extrudedHeight `之间产生。如果`height`是`undefined`，则物体从0开始。为了创造一个物体从200000米开始，延伸到250000米，我们可以使用下面的代码。这当然意味着物体本身是50000米高。
```javascript
wyoming.polygon.height = 200000;
wyoming.polygon.extrudedHeight = 250000;
```
![](https://i.loli.net/2018/11/01/5bdabd5c01d55.jpg)
> 本文由 [admin](http://www.getyii.com/member/admin) 创作，采用 [知识共享署名 3.0 中国大陆许可协议](http://creativecommons.org/licenses/by/3.0/cn) 进行许可。
可自由转载、引用，但需署名作者且注明文章出处。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/