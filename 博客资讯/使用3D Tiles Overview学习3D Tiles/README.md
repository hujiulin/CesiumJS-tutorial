# 使用3D Tiles Overview学习3D Tiles

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

我们创建了3D Tiles用以流式化、可视化和分析大量的三维内容，如整个城市或复杂的建筑模型。基于当前的[Cesium Stories][1]的更新，我们可以通过点击来检查3D Tiles中的feature数据。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/1-1.jpg" alt="" width="876" height="426" class="alignnone size-full wp-image-1643" />][2]

*现在，可以单击Cesium Stories中的任何3D Tiles feature，例如New York City tileset，以审查其数据。*

假设想了解纽约市医疗设施的分布情况。你可以使用[using styling][3]来突出显示3D Tileset中的所有建筑，然后点击来查看设施容量，，是否有紧急事件以及它们的官网和联系电话。

你也可以分享自己的Cesium Story，让其他用户以同样的方式检查它，无论他们是在办公室做一个彻底的分析，还是在外地。在移动设备上，可以折叠或展开信息框，以便在三维场景的完整视图和要素数据之间轻松切换。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/2-1.jpg" alt="" width="335" height="595" class="alignnone size-large wp-image-1644" />][4]

*Cesium Stories适用于任何现代网络浏览器。在移动设备上，可以折叠或展开信息框，以便在三维场景的完整视图和要素数据之间轻松切换。*

Cesium Stories中的feature拾取可在任何具有feature数据的3D Tileset上工作，且不限制feature的物理尺寸，因此这非常适合于BIM/CAD等行业，在这些行业中，需要检查非常大的管道，直至最小的阀门或螺钉。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/3-1.jpg" alt="" width="877" height="492" class="alignnone size-large wp-image-1645" />][5]

*Cesium Stories中的feature提取可以在任何包含feature数据的3D Tileset上工作，比如电厂BIM模型中的管道和阀门。*

Feature拾取也适用于向量数据，比如GeoJSON、KML和CZML。向量层提供了一种简单的方式来添加或更新特征数据，即使3D Tileset本身不包含任何已定义的特征。

在下面的例子中，我们从没有feature数据的Cesium Ion Asset仓库中提取了华盛顿特区的Vricon摄影测量tileset，并将其与华盛顿特区开放数据平台的建筑能源使用CZML相结合。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/4.jpg" alt="" width="876" height="482" class="alignnone size-large wp-image-1646" />][6]

*结合能源使用的CZML和华盛顿特区的摄影测量，让我们可以点击任何建筑物，查看其能源得分。该CZML是自定义的，可以添加建筑物的图片。*

允许用户可以点击任何一个建筑，查看它的名称，年能耗，和能源之星得分。KML和CZML支持HTML描述，因此可以添加图像、链接，或者通常自定义它的样式。

我们非常激动你将用它来构建您要的东西。学习如何在[the Cesium Stories styling tutoral][7]中使用拾取和样式化造型。

原文链接：https://cesium.com/blog/2020/03/25/explore-data-with-picking/

作者：[Omar Shehata][8]

评语：Cesium Stories功能强大，非常值得一试。

Cesium中文网交流QQ群：807482793

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

 [1]: https://cesium.com/blog/2020/01/28/cesium-stories/
 [2]: http://blog.coinidea.com/wp-content/uploads/2020/03/1-1.jpg
 [3]: https://cesium.com/blog/2020/02/18/3d-tiles-styling-with-stories/
 [4]: http://blog.coinidea.com/wp-content/uploads/2020/03/2-1.jpg
 [5]: http://blog.coinidea.com/wp-content/uploads/2020/03/3-1.jpg
 [6]: http://blog.coinidea.com/wp-content/uploads/2020/03/4.jpg
 [7]: https://cesium.com/docs/tutorials/stories-styling/
 [8]: https://cesium.com/team/OmarShehata/