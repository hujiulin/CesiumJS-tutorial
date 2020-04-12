# 从带Per-Building数据的KMLCOLLADA中创建3D Tiles

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

许多Cesium的使用者经常需要将整个城市的数十万个三维建筑可视化，用于房地产、城市规划或土木工程项目。为了更便捷地为这些行业创建有用的虚拟数据（digital twins），我们刚刚添加了在将KML/COLLADA上传到Cesium ion时嵌入特征数据的支持。

这意味着您现在可以从建模工具（如CityEngine、Rhino和3DCityDB）导出您的三维建筑，并在Cesium ion web上共享数据时包含每个建筑的属性。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/1-1024x614.jpeg" alt="" width="1024" height="614" class="alignnone size-large wp-image-1666" />][1] *Philadelphia 的3D建筑与Cesium World Terrain相结合。可以单击每个建筑以显示其名称name、地址address和地块编号parcel number。*

Cesium ion将你的建筑转换为3D Tiles，以优化它的网络，同时仍然允许你检查每一栋建筑。上述示例的源3D Data来自宾夕法尼亚州空间数据访问( Pennsylvania Spatial Data Access)，地址、名称、地块编号和城市所有的属性来自费城开放数据（Open Data Philly）。

为了深入了解这种可视化，我们可以使用[3D Tiles Styling][2]来突出显示Philadelphia拥有的所有属性，并单击它们以获取其包裹编号。然后，可以使用地块编号从城市数据库中查找有关每个建筑的更多信息。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/04/2-1024x732.jpeg" alt="" width="1024" height="732" class="alignnone size-large wp-image-1667" />][3] *您可以使用3D Tiles Styling来突出显示Philadelphia城市拥有的所有建筑物，如博物馆和历史遗迹。*

要为城市创建这样的场景，源数据应该是一个或多个KML文件，用于定义每个三维模型的位置。这是一个来自KML文件的片段，用于费城建筑物。

<pre><code class="javascript">&lt;Placemark&gt;
  &lt;name&gt;Independence Hall&lt;/name&gt;
  &lt;Model&gt;
    &lt;Link&gt;&lt;href&gt;building.dae&lt;/href&gt;&lt;/Link&gt;
    &lt;!-- Model properties like longitude, latitude, etc... --&gt;
  &lt;/Model&gt;
  &lt;ExtendedData&gt;                       
    &lt;Data name="Address"&gt;
      &lt;value&gt;500-36 CHESTNUT ST&lt;/value&gt;
    &lt;/Data&gt;
    &lt;Data name="Parcel_ID"&gt;
      &lt;value&gt;313762&lt;/value&gt;
    &lt;/Data&gt;
    &lt;Data name="Is_City_Owned"&gt;
      &lt;value&gt;True&lt;/value&gt;
    &lt;/Data&gt;
  &lt;/ExtendedData&gt; 
&lt;/Placemark&gt;
</code></pre>

`Placemark`的名称用作建筑物的名称。任何附加数据都可以添加到<extendeddata>标记中。</extendeddata>

一旦你把建筑上传到Cesium ion，你就可以用[Cesium Stories][4]来设计和检查它。您还可以将它与其他类型的内容（如CityGML或点云）组合，这些内容也可以具有嵌入特征数据。

请尝试创建Cesium ion账户并上传你的建筑[creating a Cesium ion account and uploading your 3D buildings][5]。

作者：[Omar Shehata][6]

原文链接：https://cesium.com/blog/2020/04/09/kml-collada-metadata/

评语：Cesium官方不遗余力的推动Cesium ion和Cesium Stories，大家也可以关注一下，但是我本人对online的东西不是那么信奉，毕竟大家都喜欢搞离线。数据安全也日益重要。

Cesium中文网交流QQ群：807482793

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

 [1]: http://blog.coinidea.com/wp-content/uploads/2020/04/1.jpeg
 [2]: https://cesium.com/blog/2020/02/18/3d-tiles-styling-with-stories/
 [3]: http://blog.coinidea.com/wp-content/uploads/2020/04/2.jpeg
 [4]: https://cesium.com/docs/tutorials/stories-styling/
 [5]: https://cesium.com/ion
 [6]: https://cesium.com/team/OmarShehata/