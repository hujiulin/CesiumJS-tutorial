# Cesium入门8 - Configuring the Scene - 配置视窗
接下来将添加一些更多的正确的时间和空间设置到Viewer中。涉及到与**viewer.scene**进行交互，该类控制了viewer中的所有图形元素。
1. 首先，我们配置一下我们的scene，用以下代码激活基于太阳位置的光照：
```javascript
// Enable lighting based on sun/moon positions
viewer.scene.globe.enableLighting = true;
```
按照以上配置，我们scene(场景)中的光照将会随着每天时间的变化而变化。如果你zoom out，你就会看到一部分数字地球位于黑暗之中，因为模拟真实的地球，太阳只能照射到地球的一部分。

2. 在我们开始初始化启动view之前，我们先简略的过一下一些基础的Cesium类型：
- **[Cartesian3](https://cesiumjs.org/Cesium/Build/Documentation/Cartesian3.html)** : 一个三维笛卡尔坐标——当它被用作相对于地球中心的位置时，使用地球固定框架（ECEF）。
- **[Cartographic](https://cesiumjs.org/Cesium/Build/Documentation/Cartographic.html)** : 由经度、纬度（弧度）和WGS84椭球面高度确定的位置。
- **[HeadingPitchRoll](https://cesiumjs.org/Cesium/Build/Documentation/HeadingPitchRoll.html)** : 在东北向上的框架中关于局部轴的旋转（弧度）。航向是围绕负Z轴的旋转。俯仰是围绕负Y轴的旋转。滚动是关于正X轴的旋转。
- **[Quaternion](https://cesiumjs.org/Cesium/Build/Documentation/Quaternion.html)** :以4D坐标表示的3D旋转。

这些是在场景中定位和定位Cesium objects所必需的基本类型，并且有许多有用的转换方法。请参阅每种类型的文档以了解更多信息。

现在让我们把相机定位在我们数据所在的NYC（纽约）的场景中。

### Camera Control
相机是**viewer.scene**中的属性，用来控制当前可见的域。我们可以通过直接设置它的位置和方向来控制相机，或者通过使用Cesium提供的API来控制相机，它被设计成指定相机的位置和方向随时间的变化。

一些最常用的方法如下：
- **[Camera.setView(options)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#setView)**: 在特定位置和方向立即设置相机。
- **[Camera.zoomIn(amount)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#zoomIn)**: 沿着视角矢量移动摄像机。
- **[Camera.zoomOut(amount)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#zoomOut)**: 沿视角矢量向后移动摄像机。
- **[Camera.flyTo(options)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#flyTo)**: 创建从当前相机位置到新位置的动画相机飞行。
- **[Camera.lookAt(target, offset)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#lookAt)** : 定位并定位摄像机以给定偏移量瞄准目标点。
- **[Camera.move(direction, amount)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#move)** : 朝任何方向移动摄像机。
- **[Camera.rotate(axis, angle)](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#rotate)** : 绕任意轴旋转相机。


进一步获得API功能，看看这些相机演示：
- **[Camera API Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Camera.html&label=Tutorials)**
- **[Custom Camera Controls Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Camera%20Tutorial.html&label=Tutorials)**

让我们尝试一种方法将相机跳转到纽约。使用**camera.setView()**初始化view，使用**Cartesian3**和**HeadingpitchRoll**指定相机的位置和方向:
```javascript
// Create an initial camera view
var initialPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
var homeCameraView = {
    destination : initialPosition,
    orientation : {
        heading : initialOrientation.heading,
        pitch : initialOrientation.pitch,
        roll : initialOrientation.roll
    }
};
// Set the initial view
viewer.scene.camera.setView(homeCameraView);
```
相机现在被定位和定向以俯瞰曼哈顿，并且我们的视图参数被保存在一个对象中，我们可以将其传递给其他相机方法。

实际上，我们可以使用这个相同的视角来更新按下home按钮的效果。我们不必让它从远处返回地球的默认视角，我们可以重写按钮，使我们看到曼哈顿的初始视角。我们可以通过添加几个选项来调整动画，然后添加一个取消默认航班的事件侦听器，并调用**FlyTo()**我们的Home视角：
```javascript
// Add some camera flight animation options
homeCameraView.duration = 2.0;
homeCameraView.maximumHeight = 2000;
homeCameraView.pitchAdjustHeight = 2000;
homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
// Override the default home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    viewer.scene.camera.flyTo(homeCameraView);
});
```
更多关于基本相机控制，请访问我们的[Camera Tutorial](https://cesiumjs.org/tutorials/Camera-Tutorial/)。

### Clock Control
接下来，我们配置viewer的**Clock**和**Timline**来控制scene的时间进度。

这里是[clock的相关API](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Clock.html&label=Showcases)

当使用特定时间时，Cesium使用**JulandDATE**类型，它存储了1月1日中午以来的天数-4712（公元前4713年）。为了提高精度，该类将日期和秒的全部部分存储在单独的组件中。为了计算安全和代表跳跃秒，日期总是存储在国际原子时间标准中。

下面是我们如何设置场景时间选项的例子：
```javascript
// Set up clock and timeline.
viewer.clock.shouldAnimate = true; // make the animation play when the viewer starts
viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
viewer.clock.multiplier = 2; // sets a speedup
viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // set visible range
```
这设置场景动画的速率、开始和停止时间，并告诉时钟在到达停止时间时循环回到开始。它还将时间线控件设置为适当的时间范围。看看这个[时钟示例代码](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Clock.html&label=All)来测试时钟设置。

这是我们的初始场景配置！现在，当你运行你的应用程序时，你应该看到以下内容：
![](https://i.loli.net/2018/08/15/5b73993cde9af.jpg)

**Cesium中文网交流QQ群：807482793**