# Cesium入门12 - Camera Modes - 相机模式
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

为了展现我们的无人机飞行，让我们用相机模式进行实验。我们将保持简单的两个基本的相机模式，用户可以切换之间。
- Free Mode : 默认相机控制。
- Drone Mode : 让相机跟随无人机通过飞行在一个固定的距离。

自由模式不需要代码，因为它使用默认控件。至于无人机跟随模式，我们可以使用摄像机的内置实体跟踪功能来定位摄像机，并用偏移量定位无人机。这就使得相机即使在移动时也能从指定的实体中得到固定的偏移量。为了跟踪一个实体，我们简单地设置**viewer.trackedEntity**。

要切换到自由相机模式，我们可以将**viewer.trackedEntity**实体设置为未定义，然后使用**camera.flyTo()**返回到我们的Home视角。

以下是相机模式的函数：
```javascript
// Create a follow camera by tracking the drone entity
function setViewMode() {
    if (droneModeElement.checked) {
        viewer.trackedEntity = drone;
    } else {
        viewer.trackedEntity = undefined;
        viewer.scene.camera.flyTo(homeCameraView);
    }
}
```

为了把这个附加到HTML输入，我们可以附加这个函数来**change**事件到适当的元素上：
```javascript
var freeModeElement = document.getElementById('freeMode');
var droneModeElement = document.getElementById('droneMode');

// Create a follow camera by tracking the drone entity
function setViewMode() {
    if (droneModeElement.checked) {
        viewer.trackedEntity = drone;
    } else {
        viewer.trackedEntity = undefined;
        viewer.scene.camera.flyTo(homeCameraView);
    }
}

freeModeElement.addEventListener('change', setCameraMode);
droneModeElement.addEventListener('change', setCameraMode);
```
最后，当用户双击实体时，实体会被自动跟踪。如果用户通过单击开始跟踪无人机，我们可以添加一些处理来自动更新UI。
```javascript
viewer.trackedEntityChanged.addEventListener(function() {
    if (viewer.trackedEntity === drone) {
        freeModeElement.checked = false;
        droneModeElement.checked = true;
    }
});
```
这是我们的两个相机模式-我们现在可以自由切换到无人机相机视角，看起来像这样：
![](https://i.loli.net/2018/08/16/5b75259f35d71.jpg)

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/