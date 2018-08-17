# Cesium入门5 - Cesium ion
Cesium ion是一个提供瓦片图和3D地理空间数据的平台，Cesium ion支持把数据添加到用户自己的CesiumJS应用中。下面我们将使用Sentinal-2二维贴图和Cesium世界地形，二者都需要ion的支持。

**备注**
在我们使用Cesium的过程中，如果没有申请ion，同时没有自己的数据源用的cesium提供的数据源，viewer的底部常常会提示一行小的英文字母。大意就是需要申请access token.

1. 首先需要去注册一个免费的Cesium ion账户。
2. 打开 https://cesium.com/ion/ 然后注册一个新的账户。
3. 点击"Access Token"，跳转到***Access Tokens page***页面。
4. 选择***Default***默认的access token拷贝到contents中。

![](https://i.loli.net/2018/08/13/5b71340864d94.png)

在创建Cesium Viewer的时候，将access token填为自己的access token即可。
```javascript
Cesium.Ion.defaultAccessToken = '<YOUR ACCESS TOKEN HERE>';
```

以上就能畅快的访问Cesium ion提供的各种数据源了。

**更多问题**可以访问
<a href="https://cesium.com/docs/tutorials/getting-started/" target="_blank">Getting Started with Cesium ion</a>

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/