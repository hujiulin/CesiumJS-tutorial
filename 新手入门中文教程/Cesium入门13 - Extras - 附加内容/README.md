# Cesium入门13 - Extras - 附加内容
剩下的代码只是添加了一些额外的可视化选项。类似于我们以前与HTML元素的交互，我们可以将侦听器函数附加到切换阴影和neighborhood 多边形可见性。

让我们开始创建一个简单的方法来切换neighborhood多边形。一般来说，我们可以通过**Entity.show**用实体设置可见性来隐藏实体。但是，这只为单个实体设置可见性，并且我们希望一次性隐藏或显示所有的neighborhood实体。

我们可以通过将所有的neighborhood 实体添加到父实体中来实现这一点，如[本示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Show%20or%20Hide%20Entities.html&label=Showcases)中所示，或者简单地使用**EntityCollection**的***show***属性。然后，我们可以通过改变***neighborhoods.show***来为所有的子实体一次设置可见性。

```javascript
var neighborhoodsElement =  document.getElementById('neighborhoods');

neighborhoodsElement.addEventListener('change', function (e) {
    neighborhoods.show = e.target.checked;
});
```
我们可以做一些类似的事情来切换阴影的可视性：
```javascript
var shadowsElement = document.getElementById('shadows');

shadowsElement.addEventListener('change', function (e) {
    viewer.shadows = e.target.checked;
});
```

最后，由于3D Tiles可能不立即加载，所以我们也可以添加一个加载指示符，只有在tileset加载完成时才被移除（因此promise已经解决）。

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/