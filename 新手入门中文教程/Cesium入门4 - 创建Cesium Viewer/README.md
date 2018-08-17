# Cesium入门4 - 创建Cesium Viewer
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

任何Cesium应用程序的基础都是**Viewer**。Viewer是一个带有多种功能的可交互的三位数字地球的容器（盒子）。创建一个Viewer和HTML中的一个id为"cesiumContainer"的div绑定即可。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
```

使用以上代码之后，能看到下图所示的基本的数字地球：
![](https://i.loli.net/2018/08/13/5b70f7c2119d5.jpg)

默认地，场景支持鼠标（电脑）和手指（移动设备）交互。控制相机漫游数字地球可以通过以下方式：
- Left click and drag - Pans the camera over the surface of the globe.
- Right click and drag - Zooms the camera in and out.
- Middle wheel scrolling - Also zooms the camera in and out.
- Middle click and drag - Rotates the camera around the point on the surface of the globe.
**翻译**
- 按住鼠标左键拖拽 - 让相机在数字地球平面平移。
- 按住鼠标右键拖拽 - 放缩相机。
- 鼠标滚轮滑动 - 放缩相机。
- 按住鼠标中键拖拽 - 在当前地球的屏幕中间点，旋转相机。

默认的Viewer自带了一些有用的组件：
![](https://i.loli.net/2018/08/13/5b70f7cbf3693.jpg)

1. Geocoder : A location search tool that flies the camera to queried location. Uses Bing Maps data by default.
2. HomeButton : Flies the viewer back to a default view.
3. SceneModePicker : Switches between 3D, 2D and Columbus View (CV) modes.
4. BaseLayerPicker : Chooses the imagery and terrain to display on the globe.
5. NavigationHelpButton : Displays the default camera controls.
6. Animation : Controls the play speed for view animation.
7. CreditsDisplay : Displays data attributions. Almost always required!
8. Timeline : Indicates current time and allows users to jump to a specific time using the scrubber.
9. FullscreenButton : Makes the Viewer fullscreen.

**翻译**
1. Geocoder : 一种地理位置搜索工具，用于显示相机访问的地理位置。默认使用微软的Bing地图。
2. HomeButton : 首页位置，点击之后将视图跳转到默认视角。
3. SceneModePicker : 切换2D、3D 和 Columbus View (CV) 模式。
4. BaseLayerPicker : 选择三维数字地球的底图（imagery and terrain）。
5. NavigationHelpButton : 帮助提示，如何操作数字地球。
6. Animation :控制视窗动画的播放速度。
7. CreditsDisplay : 展示商标版权和数据源。
8. Timeline : 展示当前时间和允许用户在进度条上拖动到任何一个指定的时间。
9. FullscreenButton : 视察全屏按钮。

我们可以通过代码来配置视窗组件，在我们初始化视窗的时候，通过配置参数添加/移除相关组件。
以下代码是通过参数配置得到的viewer,该Viewer不带selection indicators, base layer picker or scene mode picker等组件。
```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
    scene3DOnly: true,
    selectionIndicator: false,
    baseLayerPicker: false
});
```
如果需要查看Viewer的完整配置，请查看：https://cesiumjs.org/Cesium/Build/Documentation/Viewer.html。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/