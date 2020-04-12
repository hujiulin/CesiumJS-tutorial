# 使用EdgyGeo Cesium工具查询下载数据集

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

[EdgyGeo, Inc.][1] 带来了一件非常棒的工作支撑架构、工程和构建（AEC）工业。这次让我们来看它们的下载工具，它允许架构师、工程师、开发者和城市规划者快速地获取指定区域的海量数据集。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/la.jpg" alt="" width="800" height="451" class="alignnone size-large wp-image-1616" />][2] *一个场景中的三维建筑物和路线。数据集来自Los Angeles。*

有了Cesium-based viewer，EdgyGeo允许用户探索整个城市。他们数据的亮点是高分辨率的CyberCity 3D建筑，摄影测量自动建模生成。它们的高分辨率建筑库覆盖了美国近100个城市和世界其他几十个主要城市，另外还提供其他地点使用的挤压式建筑。

但EdgyGeo提供的还不止这些建筑。它们拥有来自州和地方政府（特别是城市）、公用事业、机场、商业房地产公司、市中心开发协会和第三方实体的数据集。这些数据集包括地形、环境数据、联邦应急管理局洪水数据和其他地理信息系统数据。订阅者还可以添加自己的数据资产并构建数据清单。

EdgyGeo收集并整理这些数据。利用Cesium的3D tiling pipeline，它们将这些数据集拼接成3D Tiles，并将它们融合在Cesium ion中，这样无论收集到的数据有多大，都可以高效地流式传输，并在具有三维地形和图像的地图中轻松地进行探索。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/3dtiles.jpg" alt="" width="522" height="314" class="alignnone size-full wp-image-1615" />][3]

*Cesium的3D tiling pipeline允许EdgyGeo同时在线共享大量数据集。*

不仅场景易于浏览，用户还可以下载数据用于自己的项目。用户只需选择场景的一部分并下载该区域中的数据。他们可以一次下载多个地理信息系统数据集，包括CyberCity 3D建筑模型、3D地形、航拍图像、中心线、路缘等，上述所有数据都是精确地理定位的。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/sketchup.jpg" alt="" width="800" height="494" class="alignnone size-large wp-image-1618" />][4] *很容易找到和选择特定区域的相关数据集，如选取Cambridge, MA。*

下载以Collada（DAE）和KML/KMZ格式提供，用户可以随时上传到自己Cesium ion帐户或在其他应用程序（如Rhino、SketchUp和Revit）中进行可视化。KML格式也将很快成为可用的格式。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/mit.jpg" alt="" width="800" height="452" class="alignnone size-large wp-image-1617" />][5] *EdgyGeo导出的三维几何图形在SketchUp中可视化。*

有了这个可定制的下载选项，订阅者可以获取特定项目中所需的本地数据集，在一个简单的数据下载和传输过程中链接GIS、AEC、BIM和构建工具。

可以通过联系EdgyGeo首席执行官[Kevin DeVito][6]来试用该工具。

作者：[Sarah Chow][7]

原文链接：https://cesium.com/blog/2020/03/03/edgygeo-3d-tiles-download/

评论：Cesium ion似乎是Cesium官方主推的数据存储及管理工具。从未来发展来看，建议大家可以使用本文中的下载工具和Cesium ion。

Cesium中文网交流QQ群：807482793

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

 [1]: https://cesium.com/blog/2019/11/25/edgygeo-tools-for-real-estate/
 [2]: http://blog.coinidea.com/wp-content/uploads/2020/03/la.jpg
 [3]: http://blog.coinidea.com/wp-content/uploads/2020/03/3dtiles.jpg
 [4]: http://blog.coinidea.com/wp-content/uploads/2020/03/sketchup.jpg
 [5]: http://blog.coinidea.com/wp-content/uploads/2020/03/mit.jpg
 [6]: mailto:'kdevito@edgygeo.com'
 [7]: https://cesium.com/team/SarahChow/