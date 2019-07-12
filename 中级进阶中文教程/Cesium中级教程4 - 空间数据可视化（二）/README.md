# Cesium中级教程4 - 空间数据可视化
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

## Viewer中的Entity功能
让我们看看*Viewer*为操作entities提供出来的功能函数。

### 选中和描述
点击Viewer中的entity将在entity的位置上呈现**SelectionIndicator**控件，提供一个**InfoBox**用于呈现更多的信息。我们可以设置*name*，来定义*InfoBox*的标题。我们也以HTML样式来提供*Entity.description*的属性。
```javascript
wyoming.name = 'wyoming';
wyoming.description = '\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="//cesium.com/docs/tutorials/creating-entities/Flag_of_Wyoming.svg"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\
<p>\
  Wyoming is the 10th most extensive, but the least populous \
  and the second least densely populated of the 50 United \
  States. The western two thirds of the state is covered mostly \
  with the mountain ranges and rangelands in the foothills of \
  the eastern Rocky Mountains, while the eastern third of the \
  state is high elevation prairie known as the High Plains. \
  Cheyenne is the capital and the most populous city in Wyoming, \
  with a population estimate of 63,624 in 2017.\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>';
```

![](https://i.loli.net/2019/05/22/5ce4ab397a79173169.jpg)

*InfoBox*中展示的所有HTML是沙盒式的。这组织了外部数据源带有恶意的注入到Cesium的应用程序中。为了在描述中运行JavaScript或浏览器插件，访问沙盒中的iframe通过*viewer.infoBox.frame*属性。参考[该文](http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)可以获得更多的信息用于控制iframe中的沙盒。

## Camera控制
使用*iewer.zoomto*命令查看特定Entity。还有一个**viewer.flyto**方法，用于对Entity执行动画Camera飞行。这两种方法都可以传递给*Entity*、*EntityCollection*、**DataSource**或实体数组。

任何一种方法都会计算所有提供的实体的视图。默认情况下，Camera朝向北方，并从45度角向下看。通过传入*HeadingPitchrange*自定义此项。

```javascript
var heading = Cesium.Math.toRadians(90);
var pitch = Cesium.Math.toRadians(-30);
viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch));
```
![](https://i.loli.net/2019/05/22/5ce4ab509dfa357270.jpg)

*zoomTo*和*flyTo*都是异步函数；也就是说，它们不能保证在返回之前完成。例如，飞行到Entity会在许多动画帧后发生。这两个功能都返回[Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)，可用于计划飞行或缩放完成后要执行的功能。用下面的代码片段替换示例中的*zoomTo*。这架飞机飞往怀俄明州，并在飞行结束后选中它。
```javascript
viewer.flyTo(wyoming).then(function(result){
    if (result) {
        viewer.selectedEntity = wyoming;
    }
});
```

如果航班飞行成功完成，则传递给回调函数的结果参数将为*true*；如果航班被取消，则结果参数将为*false*，即，在此航班完成之前，用户启动了另一个航班或缩放；或者，由于目标没有相应的可视化效果，即没有可缩放的对象。

有时，特别是在处理时间动态数据时，我们希望Camera聚焦跟随一个entity而不是地球的中心。可以通过设置**viewer.trackedEntity**完成。跟踪实体需要设置**position**。
```javascript
wyoming.position = Cesium.Cartesian3.fromDegrees(-107.724, 42.68);
viewer.trackedEntity = wyoming;
```

停止跟踪需要设置**viewer.trackedEntity**为**undefined**或远离entity双击屏幕即可。调用**zoomTo**或**flyTo**也可以取消跟踪。

## 管理Entities
**EntityCollection**是用于管理和监视一组实体的关联数组。*viewer.entities*是*EntityCollection*。*EntityCollection*包括用于管理实体的方法，如**add**、**remove**和**removeAll**。

有时我们需要更新我们以前创建的实体。所有实体实例都有一个唯一的**id**，可用于从集合中检索实体。我们可以为实体指定一个ID，否则将自动生成一个ID。

```javascript
viewer.entities.add({
    id : 'uniqueId'
});
```

使用**getByiId**检索实体。如果不存在具有提供的ID的实体，则返回*undefined*。

```javascript
var entity = viewer.entities.getById('uniqueId');
```

要获取实体或创建新实体（如果不存在），请使用**getOrCreateEntity**。
```javascript
var entity = viewer.entities.getOrCreateEntity('uniqueId');
```

手动创建新实体，然后使用*add*将其添加到集合中。如果集合中已存在具有相*id*的实体，则此方法将抛出异常。
```javascript
var entity = new Entity({
    id : 'uniqueId'
});
viewer.entities.add(entity);
```

*EntityCollection*的功能使用**CollectionChanged**事件发光。当在集合中添加、删除或更新实体时，会通知监听器。

使用Sandcastle中的[Geometry Showcase]
(https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Geometry%20and%20Appearances.html&label=Showcases) 示例。在创建viewer的行后粘贴以下代码。

```javascript
function onChanged(collection, added, removed, changed){
  var msg = 'Added ids';
  for(var i = 0; i < added.length; i++) {
    msg += '\n' + added[i].id;
  }
  console.log(msg);
}
viewer.entities.collectionChanged.addEventListener(onChanged);
```

运行该示例时，您应该在控制台中看到大约65条消息，每次调用*viewer.entities.add*时都会看到一条消息。

当一次更新大量的实体时，将队列更新结束后并在最后发送一个整体事件，这样更具性能。这样Cesium可以在一次通过中处理所需的变化。在示例末尾，在*viewer.entities.add*之前调用**viewer.entities.suspendEvents**，并调用**viewer.entities.resumeEvents**。当再次运行演示时，我们现在得到包含所有65个实体的单一事件。这些调用是引用计数的，因此可以嵌套多个挂起和恢复调用。

## Picking 拾取
选择（单击选择一个对象）是我们需要与基本API进行短暂交互的领域之一。使用**scene.pick**和**scene.drillpick**检索实体。
```javascript
/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity} The picked entity or undefined.
 */
function pickEntity(viewer, windowPosition) {
  var picked = viewer.scene.pick(windowPosition);
  if (defined(picked)) {
    var id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
      return id;
    }
  }
  return undefined;
};

/**
 * Returns the list of entities at the provided window coordinates.
 * The entities are sorted front to back by their visual order.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity[]} The picked entities or undefined.
 */
function drillPickEntities(viewer, windowPosition) {
  var i;
  var entity;
  var picked;
  var pickedPrimitives = viewer.scene.drillPick(windowPosition);
  var length = pickedPrimitives.length;
  var result = [];
  var hash = {};

  for (i = 0; i < length; i++) {
    picked = pickedPrimitives[i];
    entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (entity instanceof Cesium.Entity &&
        !Cesium.defined(hash[entity.id])) {
      result.push(entity);
      hash[entity.id] = true;
    }
  }
  return result;
};
```

## Points, billboards, and labels（点、广告牌和标签）
通过设置*position*、**point**和**label**来创建图形点或标签。例如，在我们最喜欢的运动队的主体育场放置一个点。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');

var citizensBankPark = viewer.entities.add({
    name : 'Citizens Bank Park',
    position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    point : {
        pixelSize : 5,
        color : Cesium.Color.RED,
        outlineColor : Cesium.Color.WHITE,
        outlineWidth : 2
    },
    label : {
        text : 'Citizens Bank Park',
        font : '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -9)
    }
});

viewer.zoomTo(viewer.entities);
```

![](https://i.loli.net/2019/05/22/5ce4ab8e0a06870941.jpg)

默认情况下，标签水平和垂直居中。由于标签和点共享相同的位置，它们在屏幕上重叠。为避免这种情况，请指定标签源*Verticalorigin.BOTTOM*并将像素偏移量设置为（0，-9）。
将该点替换为一个**billboard**，它是一个始终面向用户的标记。
```javascript
var citizensBankPark = viewer.entities.add({
  position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
  billboard : {
    image : '//cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Philadelphia_Phillies.png',
    width : 64,
    height : 64
  },
  label : {
    text : 'Citizens Bank Park',
    font : '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.TOP,
    pixelOffset : new Cesium.Cartesian2(0, 32)
  }
});
```
![](https://i.loli.net/2019/05/22/5ce4aba37ceae81956.jpg)

有关更多自定义选项，请参见Sandcastle**标签**和**广告牌**示例。

## 3D models （三维模型）
CesiumJS支持通过glTF（运行时asset format）创建3D模型。您可以在[3D models](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Models.html&label=Showcases)Sandcastle中找到示例模型。

将位置和URI设置为glTF 模型以创建模型实体。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
var entity = viewer.entities.add({
    position : Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model : {
        uri : '../../../../Apps/SampleData/models/GroundVehicle/GroundVehicle.glb'
    }
});
viewer.trackedEntity = entity;
```

![](https://i.loli.net/2019/05/22/5ce4abc76626d77156.jpg)

默认情况下，模型是垂直的，面向东。通过为**Entity.Orientation**属性指定**Quaternion**来控制模型的方向。这将控制模型的heading、pitch和roll。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
var heading = Cesium.Math.toRadians(45.0);
var pitch = Cesium.Math.toRadians(15.0);
var roll = Cesium.Math.toRadians(0.0);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));

var entity = viewer.entities.add({
    position : position,
    orientation : orientation,
    model : {
        uri : '../../../../Apps/SampleData/models/GroundVehicle/GroundVehicle.glb'
    }
});
viewer.trackedEntity = entity;
```

有关更高级的模型功能，请参见[3D模型教程](https://cesium.com/docs/tutorials/3d-models)。如果你创建自己的模型，一定要看到我们关于[glTF Tips for Artists](https://cesium.com/blog/2014/12/15/gltf-tips-for-artists/)提示的帖子。

## The property system（属性系统）
我们为实体定义的所有值都存储为*property*对象。例如，请参见怀俄明州大纲的值：
```javascript
console.log(typeof wyoming.polygon.outline);
```

*outline*是**ConstantProperty**的一个实例。本教程使用一种称为隐式属性转换（implicit property conversion）的速记形式，它自动获取原始值并在引擎盖下创建相应的*Property*。如果没有这个速记，我们将不得不编写一个更长版本的初始示例：
```javascript
var wyoming = new Cesium.Entity();
wyoming.name = 'Wyoming';

var polygon = new Cesium.PolygonGraphics();
polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.5));
polygon.outline = new Cesium.ConstantProperty(true);
polygon.outlineColor = new Cesium.ConstantProperty(Cesium.Color.BLACK);
wyoming.polygon = polygon;

viewer.entities.add(wyoming);
```
之所以使用属性，是因为实体API不仅能够表示常量值，而且能够表示随时间变化的值。请参阅[Callback Property](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Callback%20Property.html)和[Interpolation](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Interpolation.html) Sandcastle示例，了解一些时间动态属性。

## 资源
有关如何使用*GeoJSON*和*CZML*设置样式和创建实体的示例，请参阅[Cesium Workshop Tutorial](https://cesium.com/docs/tutorials/cesium-workshop)。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/