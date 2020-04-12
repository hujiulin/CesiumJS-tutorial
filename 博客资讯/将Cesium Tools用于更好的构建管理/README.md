# 将Cesium Tools用于更好的构建管理

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

Cesium技术正在给建筑业带来革命性的变化。我们与 [partnership with Komatsu][1]合作开发的智能建筑仪表盘使我们能够比以往更快地可视化、测量和分析建筑工地的进度。下面将介绍它的工作原理。

## 聚集不同的数据集来评估进度

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/1-1024x522.png" alt="" width="1024" height="522" class="alignnone size-large wp-image-1654" />][2] *为了保持跟踪，现场管理人员必须不断地将在CAD设计中提供的计划与现场实际发生的情况进行比较，这些情况由传统调查（Traditional survey）、无人机调查（Drone survey）和智能施工车辆（Smart vehicles）的数据（包括竣工数据和车辆遥测数据）采集。*

Cesium Tools应用程序将设计模型与现实世界中的时间标记数据结合，以进行测量和跟踪进度。Cesium将这些数据源作为输入，将它们融合在一起以创建工作站点的最新3D表示，并将它们处理为3D平铺，以便它们可以轻松共享和流式传输。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/2-1024x552.jpg" alt="" width="1024" height="552" class="alignnone size-large wp-image-1655" />][3] *一种DSM和正射影像，转换成三维平铺，覆盖使用CAD软件包创建的线条文件中的矢量数据*

## 收集数据

生成智能构建应用程序需要我们准备接收各种数据类型，以不同的方式和完整度收集。

### 传统调查

传统测量场地的方法是使用探测车在整个工作场地的位置网格上进行GPS测量。以这种方式收集数据需要一天或更长的时间，而且收集的数据比较少。这些数据可以编译成LandXML、DXF或其他三角形网格格式的三维网格。

### 无人机调查

调查也可以由无人机或UAV进行。大约一周一次，一次最多一天，一架无人机飞过现场，在工作现场的多个地点拍照。摄影测量软件将这些照片转换成地形的整体三维模型。常见的输出包括点云、DTM/DSM地形数据和正射影像。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/3-1024x475.jpg" alt="" width="1024" height="475" class="alignnone size-large wp-image-1656" />][4] *日本大阪一个工地的点云，由无人机收集，转化成网格，再由Cesium ion平铺成3D Tiles。*

无人机调查比传统调查快得多。对于英国的一家公司来说，采用基于无人机的数据采集方法，再加上Cesium的3D拼接功能，将从采集到可视化的时间从3天缩短到30分钟。每种方法的测量结果误差不到2%。

### 智能施工车辆

建筑业的最新趋势之一是机器跟踪，要么在建筑设备中嵌入GPS传感器，要么在设备上附加售后传感器。这些传感器跟踪每台机器在工地周围移动时的情况，提供“竣工”数据部分地形数据，当与现有地面合并时，这些数据可以提供工地地形的近乎实时的图片，通常是按小时采集的。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/4-1024x582.jpg" alt="" width="1024" height="582" class="alignnone size-large wp-image-1657" />][5] *图中的黄色部分，最近从安装传感器的工程机械收集的“竣工”数据，与之前对整个工地进行的无人机调查相融合。Cesium可以让你在任何时候组合和可视化不同的表面。*

## 超乎想象

尽管能够看到正发生的事情很有价值，但Cesium Tool应用程序的真正价值在于分析功能。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/5-1024x588.jpg" alt="" width="1024" height="588" class="alignnone size-large wp-image-1658" />][6] *一个用热力图突出显示的切割和填充分析，显示需要移动多少废土和已经移动了多少废土。*

例如，如果项目经理需要将结果发送给客户进行计费，他们可以理解已移动的废土的总百分比，以及仍然需要工作的区域。确定库存中剩余材料的数量非常简单，只需点击创建一个测量：程序将计算材料的体积、重量和价值。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/6-1024x475.jpg" alt="" width="1024" height="475" class="alignnone size-large wp-image-1659" />][7] *测量库存。*

项目经理还可以通过单击路径并检查坡度（作为热力图或使用二维横截面工具的纵断面图）在行进之前查看路线。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/7-1024x531.jpg" alt="" width="1024" height="531" class="alignnone size-large wp-image-1660" />][8] *地形坡度热图。*

这只是智能构建应用程序（Smart Construction app）中Cesium赋能的众多功能的概述。进入我们的[construction industry][9]，观看视频并了解更多信息。

原文链接：https://cesium.com/blog/2020/03/30/construction-with-cesium/

作者：[Gabby Getz][10]

评语：Cesium团队提供的工具和功能越来越强大，令人惊叹。

Cesium中文网交流QQ群：807482793

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

 [1]: https://cesium.com/blog/2020/03/10/smart-construction/
 [2]: http://blog.coinidea.com/wp-content/uploads/2020/04/1.png
 [3]: http://blog.coinidea.com/wp-content/uploads/2020/04/2.jpg
 [4]: http://blog.coinidea.com/wp-content/uploads/2020/04/3.jpg
 [5]: http://blog.coinidea.com/wp-content/uploads/2020/04/4.jpg
 [6]: http://blog.coinidea.com/wp-content/uploads/2020/04/5.jpg
 [7]: http://blog.coinidea.com/wp-content/uploads/2020/04/6.jpg
 [8]: http://blog.coinidea.com/wp-content/uploads/2020/04/7.jpg
 [9]: https://cesium.com/industries/construction
 [10]: https://cesium.com/team/GabbyGetz/