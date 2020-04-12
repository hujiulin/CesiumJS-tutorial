# 探索新冠肺炎（COVID-19）对全球航班的影响
Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

随着今天从欧洲到美国的旅行限制生效，以及为了减缓新冠病毒的传播更加劝导群众留在家中，我们很好奇这些措施何影响全旅行。显而易见，我们使用Cesium进行探索。

我们开始收集过去几个月每隔一天的航班数据。下列是进出北京主要国际机场的所有航班：

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/beijing.jpg" alt="" width="883" height="497" class="alignnone size-full wp-image-1604" />][1] [随着时间的推移，北京首都国际机场（PEK）的预定航班数量已可视化出来。起飞显示为红色，到达显示为绿色。]

一月底，航班数量急剧下降，从大约900架次迅速下降到不足300架次。这与世界卫生组织（WHO）宣布全球卫生紧急状况、美国和其他国家限制从中国出发的旅行相吻合。

继中国之后，意大利受到了冠状病毒的严重影响。第一例报告病例发生在2月22日，病例迅速激增，意大利政府于3月8日实施隔离。我们可以看到那里的航班流量在下降，尽管没有那么迅速：

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/rome.jpg" alt="" width="880" height="495" class="alignnone size-large wp-image-1607" />][2] [进出意大利罗马da Vinci–Fiumicino机场（FCO）的航班。]

截至发稿时，伦敦的航班还没有受到任何官方限制，但3月剩余时间的定期航班仍有大幅下降。我们把所有美国航班都标记为红色。

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/london.jpg" alt="" width="881" height="496" class="alignnone size-large wp-image-1605" />][3] [进出伦敦Heathrow机场的航班。]

最后，这是纽约市的肯尼迪机场，美国最大的空中交通枢纽之一。到目前为止似乎没有任何明显的变化：

[<img src="http://blog.coinidea.com/wp-content/uploads/2020/03/nyc.jpg" alt="" width="878" height="494" class="alignnone size-large wp-image-1606" />][4] [进出纽约John F. Kennedy国际机场的航班。]

## 如何创造上述可视化效果

飞行数据是从[AeroDataBox][5]获得的。它们的API读取一个机场代码参数，并返回在给定时间段内进出该机场的所有航班。

一旦我们有了这些预定的航线，我们就使用[OpenFlights][6]的开放数据来获取每个机场的位置。

最后，我们创建了一个CZML，它用一个时间戳为每个路线绘制一条线，并用Cesium Stories可视化了随时间变化的路线。

如果读者想创建类似的东西，我们建议你从Cesium Stories的[动态时序数据教程][7]开始。

原文作者：**Omar Shehata**

链接：<https://cesium.com/blog/2020/03/13/covid-19-flight-impact/>

Cesium中文网交流QQ群：807482793

Cesium中文网：<http://cesiumcn.org/> | 国内快速访问：<http://cesium.coinidea.com/>

 [1]: http://blog.coinidea.com/wp-content/uploads/2020/03/beijing.jpg
 [2]: http://blog.coinidea.com/wp-content/uploads/2020/03/rome.jpg
 [3]: http://blog.coinidea.com/wp-content/uploads/2020/03/london.jpg
 [4]: http://blog.coinidea.com/wp-content/uploads/2020/03/nyc.jpg
 [5]: https://www.aerodatabox.com/
 [6]: https://openflights.org/
 [7]: https://cesium.com/docs/tutorials/stories-time-dynamic/