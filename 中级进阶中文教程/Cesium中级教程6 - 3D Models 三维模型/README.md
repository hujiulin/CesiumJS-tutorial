# Cesium中级教程6 - 3D Models 三维模型
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

本教程将教您如何通过Primitive API转换、加载和使用Cesium中的三维模型。如果你是Cesium的新用户，可能需要阅读三维模型部分的(空间数据可视化教程)[https://cesium.com/docs/tutorials/creating-entities#3d-models],本系列教程中叫：”空间数据可视化“。

Cesium支持3D模型，包括关键帧动画、skinning(贴皮？)和独立节点选取，使用glTF，这是由Khronos Group（WebGL和COLLADA背后的联合体）为网络上的3D模型开发的一种新兴行业标准格式。Cesium还提供了一个基于网络的工具，将COLLADA模型转换为glTF，以便与Cesium一起优化使用。

## 快速入门
Cesium包括一些现成的二进制gLTF模型：
- 一个带有动画螺旋桨的飞机
- 带有动画车轮的地面车辆
- 带有皮肤周期行走的角色
- 热气球
- 一辆牛奶车（还包括Draco-compressed格式的牛奶车）

![](https://i.loli.net/2019/05/23/5ce66c595af5d67993.png)

![](https://i.loli.net/2019/05/23/5ce66c7a0f2a048411.png)

![](https://i.loli.net/2019/05/23/5ce66cb96666a37673.png)

![](https://i.loli.net/2019/05/23/5ce66cd23dc6b94823.png)

这些模型在*Apps/SampleData/models*中都有自己的目录。大多数将包括原始COLLADA文件（*.dae*）、glTF文件（*.gltf*）和/或 二进制glTF文件（*.glb*）。在Cesium应用程序中不需要使用原始的COLLADA文件。

让我们编写代码来加载这些模型。打开Sandcastle的[Hello World示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html)。在第4行*var viewer=...*下，添加一个*scene*变量。
```javascript
var scene = viewer.scene;
```

接下来，通过添加以下代码，使用glTF中的**cesium.model**加载地面车辆模型。
```javascript
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0.0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url : '../../../../Apps/SampleData/models/GroundVehicle/GroundVehicle.glb',
    modelMatrix : modelMatrix,
    scale : 200.0
}));
```

单击F8，然后使用右上角的geocoder工具缩放到Enxon，PA。

![](https://i.loli.net/2019/05/23/5ce66df59934561102.png)

我们现在直视地面车辆。我们可以用鼠标右键拖动放大，用鼠标中键拖动倾斜视图。

![](https://i.loli.net/2019/05/23/5ce66e12931b662975.png)

*cesium.Model.fromGltf*异步加载glTF模型，包括任何外部文件，并在完全加载后渲染该模型一次，从而解析**readyPromise**。只需要.gltf文件的URL，在本例中为*../../../Apps/SampleData/models/GroundVehicle/Groundvehicle.glb*。

*scale*作为可选参数提供给*fromGltf*用于放大模型。许多真实大小的模型也可以变小。所以使用一个较大的*scale*数值来第一次测试模型是有益的，比如*200000.0*，示例如下：

![](https://i.loli.net/2019/05/23/5ce66e23cdc1345182.png)

*modelMatrix*也提供给从*fromGltf*定位和旋转模型。这将为模型创建局部坐标系。这里，**Cesium.Transforms.eastnorthupfixedframe**用于创建一个本地的东北向上坐标系，其原点为经度*-75.62898254394531*度，纬度*40.02804946899414*度。可以随时更改模型的**modelMatrix**属性以移动模型。

要可视化坐标系，请使用Cesium Inspector，在第4行*var viewer=...*下的任意位置添加以下代码:
```javascript
viewer.extend(Cesium.viewerCesiumInspectorMixin);
```

单击F8，inspector界面将出现在左上方。展开*Primitives*，点击*Pick a Primitive*，点击地面上的车辆模型，然后确认*show reference frame*。

![](https://i.loli.net/2019/05/23/5ce66e3da36e087622.png)

此处： *x*轴（东）是红色的，*y*轴（北）是绿色的，以及*z*（向上）是蓝色的。


我们可以使用相同的代码来加载飞机或角色模型，只需更改URL传递给fromGltf的为“../../../../Apps/Sampledata/models/cesiumAir/Cesium-Air.glb”或“../../../Apps/SampleData/models/Cesium Man/Cesium-Man.glb”。有关其所有选项，请参阅**Cesium.Model.fromGltf的参考文档。


## 动画
这些模型中的每一个模型都有内置的动画，这些动画是由一个艺术家（比如，一个艺术家通过定义几个关键姿势创建了一个动画），Cesium在运行时进行插值以创建平滑的动画。

要播放动画，请在调用*Cesium.Model.fromGltf*后添加以下代码。
```javascript
Cesium.when(model.readyPromise).then(function(model) {
    model.activeAnimations.addAll({
        loop : Cesium.ModelAnimationLoop.REPEAT
    });
});
```

由于动画存储在glTF模型中，因此我们需要等待*readyPromise*解决后再访问它们。**addAll**用于播放模型中的所有动画。**Cesium.ModelAnimationLoop.REPEAT**循环动画，直到将其从*activeAnimations*集合中移除。要播放特定的动画，请改用**add**，并提供动画的*id*（glTF JSON属性名）。

除循环选项之外，*addAll*和*add*还提供了许多选项来控制动画的开始和停止时间、速度和方向。例如，下面的动画以半速（相对于Cesium clock）和反向运转。
```javascript
model.activeAnimations.addAll({
    loop : Cesium.ModelAnimationLoop.REPEAT,
    speedup : 0.5,
    reverse : true
});
```

*add*返回**ModelAnimation**对象（*addAll*返回这些对象的数组），其中包含动画开始、停止和更新每个帧时的事件。例如，这允许，相对于另一个动画启动一个动画。请前往API文档查看开始start、停止stop和更新update事件。

动画与Cesium clock同步，因此要查看它们，请按播放小部件上的播放。可以使用时间线和播放小部件来增加、减少和反转动画的速度。

![](https://i.loli.net/2019/05/23/5ce66e8f7624479207.png)

要将应用程序配置为自动播放动画，请初始化如下查看器：
```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});
```

## Picking 拾取
与所有Cesium primitives一样，如果选择了模型，**Scene.Pick**将返回一个模型作为其结果的一部分。此外，还返回了glTF节点和glTF网格的id（JSON属性名），从而可以精确地拾取不同的模型部件。以下示例在控制台窗口中的鼠标光标下显示节点和网格名称。
```javascript
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(
    function (movement) {
        var pick = scene.pick(movement.endPosition);
        if (Cesium.defined(pick) && Cesium.defined(pick.node) && Cesium.defined(pick.mesh)) {
            console.log('node: ' + pick.node.name + '. mesh: ' + pick.mesh.name);
        }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE
);
```

## 转换COLLADA为glTF
为了完全转换COLLDA模型到glTF格式供Cesium使用，可以使用[web-based COLLADA-to-glTF](https://cesiumjs.org/convertmodel.html)转换器。该工具能够将*.dae*文件和图像文件转换为嵌入图像的*.gltf*文件。

## Troubleshooting 故障排除
如果在Cesium中加载3D模型时出现问题，请首先确定问题所在。问题可能出现在：
- 模型工具的导出器，比如：Maya，Modo，ShetchUp等等
- COLLADA-to-glTF转换工具
- Cesium glTF渲染器

### Mac下的故障排除
在Mac上，要确定是否正确导出了COLLADA文件，请双击*.dae*文件，该文件应显示在预览窗口中。如果模型有动画，鼠标悬停在窗口底部会弹出一个工具栏来播放它们。

![](https://i.loli.net/2019/05/23/5ce66eaed78e384804.png)

如果collada文件无效，预览将显示错误。这通常表示COLLADA导出器中存在用于创建collada文件的错误。

![](https://i.loli.net/2019/05/23/5ce66ecbe2bf512165.png)

要解决此问题，请安装xcode，然后右键单击*.dae*文件并选择*Open With“打开方式”*->*xcode*。

![](https://i.loli.net/2019/05/23/5ce66ee44f8cc96805.png)

Xcode显示的模型类似于预览，但具有更多的功能，如选择单个节点的能力。Xcode还为无效的COLLADA文件实现了许多解决方法，因此它通常可以加载和预览无法加载的collada文件。如果模型在Xcode中加载，请选择“文件-保存”以将模型与解决方法一起保存，然后应在“预览确定”中加载。

![](https://i.loli.net/2019/05/23/5ce66f224ce2e12116.png)

如果在预览中仍然没有加载，那么COLLADA导出器有问题。确保您拥有最新版本的建模工具，并尝试[本文](https://cesium.com/blog/2014/12/15/glTF-Tips-for-Artists/)中的提示。如果仍然不起作用，请向建模工具（而不是Cesium）提交一个bug。也值得尝试导出为*.fbx*或其他格式，然后导入到另一个具有更好的COLLADA导出器的建模工具中。

### Windows下的故障排除
在Windows下，Visual Studio2013 包括免费的[社区版](http://www.visualstudio.com/)的模型编辑器，可以加载COLLADA模型。为了确定COLLADA文件是否被正确导出，将*.dae*文件拖拽近Visual Studio然后它被加载。如果没有加载，这通常意味着COLLADA导出器存在bug。确保您拥有最新版本的建模工具，并尝试[本文](https://cesium.com/blog/2014/12/15/glTF-Tips-for-Artists/)中的提示。如果仍然不起作用，请向建模工具（而不是Cesium）提交一个bug。它也值得尝试导出为.fbx或其他格式，然后导入到另一个具有更好的COLLADA导出器的建模工具中。

![](https://i.loli.net/2019/05/23/5ce66f463a9ff91536.png)

如果没有Visual Studio，则Autodesk有一个允许拖放的WebGL[查看器](https://360.autodesk.com/viewer)，并且不需要登录。查看器不支持动画。如果模型中有图像，请上传包含.dae和图像文件的zip包。


### Cesium中的故障排除
一旦我们有了一个有效的COLLADA文件，就通过COLLADA-to-glTF转换器运行它，然后尝试将其加载到Cesium中。如果没有加载到Cesium中或显示不正确，则转换器或Cesium中存在错误。要获取更多详细信息，请打开浏览器的开发人员工具（chrome中的ctrl-shift-i）并启用*ause on all exceptions*（chrome中的Sources选项卡），然后重新加载Cesium应用程序。

![](https://i.loli.net/2019/05/23/5ce66f5b613f719538.png)

向[Cesium论坛](https://groups.google.com/forum/#!forum/cesium-dev)发一条信息，我们通常可以提供一个解决方案，直到有修复方案。在您的帖子中，请包括：
- 原始的COLLADA和转换的glTF文件。我们认识到并不是每个人都可以分享他们的模型，但是如果可以的话，它会极大地提高我们的帮助能力。
- 浏览器的控制台窗口以及加载模型时引发的任何异常，例如

![](https://i.loli.net/2019/05/23/5ce66f6a0b28a45151.png)

## 资源
查看Sandcastle中的[3D模型示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=3D%20Models.html&label=Showcases)以及Model和ModelAnimationCollection的参考文档。


**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/