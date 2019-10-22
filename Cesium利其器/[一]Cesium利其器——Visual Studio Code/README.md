Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

## IDE

Web前端刚入门的朋友，常常想选择一个快速、好用、**流行**（其实我也不知道为什么要流行，或许是在技术的路上，工程师希望自己走在主流的路上？）的IDE（Integrated Development Environment：集成开发环境）。IDE重要么？重要也不重要。不重要是因为：它只是一个工具，我们更应该关注的是需求、逻辑、算法、知识等。重要是因为：它是一个工具，工欲善其事必先利其器，工具选好了常常能够达到事半功倍的效果。

[CesiumJS][1]官方并没有特别推荐IDE，但在入门教程[Cesium入门2 - Cesium环境搭建及第一个示例程序][2]有这么一段话：

    If you’re already a seasoned developer, you most likely have a favorite editor or development environment; for example, most of the Cesium team uses Eclipse. If you’re just starting out, a great free and open-source editor is Notepad++, which you can download from their website. Ultimately any text editor will do, so go with the one that you are most comfortable with.
    

可以看到Cesium团队主要使用开源的Eclipse或者推荐使用Notepad++。

根据笔者自身的使用情况简单列了一些使用过的IDE：

1.  Notepad（Windows自带）或TextEdit（Mac自带）
    
    价格：免费
    
    下载地址：系统自带
    
    开启速度：极快
    
    操作系统：Windows/Mac
    
    Notepad即记事本，工程师（Note:**以后笔者会将程序员称为工程师，尊重自己赢得尊重**）的终极梦想摆脱IDE用纯文本编辑器编程是一种很酷的事，但是特别困难，如果单纯的阅读一些简单的HTML、JavaScript或CSS可以用记事本打开，但是非常不建议用来开发。
    
    如果读者系统的学习过计算机科学，那么对编译、链接、生成、测试等一定不陌生（虽然前端基本不会用到编译链接），一个好的IDE一定能够对项目有很好的组织。记事本做不到这一点。

2.  Notepad++（For Windows only）
    
    价格：免费
    
    下载地址：<https://notepad-plus-plus.org/downloads/>
    
    开启速度：极快
    
    操作系统：Windows
    
    非常优秀的超轻量级编辑器，除了能够阅读和编写HTML、JavaScript或CSS之后，支持打开文件夹，这在一定程度上对项目进行了一些组织。有大量插件可以使用。目前，就读者所了解到的，它仅支持Windows环境。

3.  Sublime Text (For Windows and Mac)
    
    价格：收费闭源
    
    下载地址：www.sublimetext.com/ (官网) | <http://www.sublimetext.cn/> （国内社区）
    
    开启速度：快速
    
    操作系统：Windows
    
    非常优秀的轻量级编辑器。几乎涵盖Notepadd++的所有功能。同时支持Windows和Mac。海量插件。
    
    新特性包括：GOTO ANYTHING、GOTO DEFINITION、多重选择、命令面板、自定义、分割编辑、即时项目开关等。当然不付费，也能够使用unregistered版本。

4.  Eclipse/MyEclipse（For Windows and Mac）
    
    价格：免费/收费
    
    下载地址：<https://www.eclipse.org/downloads/>
    
    开启速递：中速/慢速
    
    操作系统：Windows/Mac
    
    MyEclipse实际上是Eclipse的一个付费版本，最开始是以插件的形式存在。Eclipse主要是作为一个Java的IDE，能够非常好的集成Java相关的插件。如果读者开发Cesium的过程中，后端选型是Java并且喜欢使用免费的IDE，没有那么关注**前后端分离**，那么Eclipse是一个非常好的选择。

5.  PHPStorm/IntelliJ IDEA/WebStorm（For Windows and Mac）
    
    价格：收费
    
    下载地址：<http://www.jetbrains.com/phpstorm/> | <http://www.jetbrains.com/idea/> | <http://www.jetbrains.com/webstorm/>
    
    开启速度：慢速
    
    操作系统：Windows/Mac
    
    从域名可以看出来，这三个IDE出自一家公司之手。它们是非常优秀的IDE，但是它们都价格不菲，并且是按年购买license。如果您有一定的资金，可以购买它们。它们真的非常优秀。其中，如果读者开发Cesium的过程中，后端选型是PHP，那么可以使用PHPStrom；如果后端选型是Java，那么可以使用IntelliJ IDEA；如果只是需要开发Web前端的代码，有一个比较好配置电脑，可以接受付费，那么可以使用WebStorm。有句老话叫：“便宜没好货，好货不便宜”，卖这么贵，是因为它们真的很好用。

6.  **Visual Studio Code （VSCode）**(For Windows and Mac)
    
    价格：免费
    
    下载地址：<https://code.visualstudio.com/>
    
    GitHub地址：https://github.com/Microsoft/vscode
    
    开启速度：快速
    
    操作系统：Windows/Mac
    
    便宜真的没好货么？并不是，向大家隆重介绍，宇宙最强IDE VSCode。在MSRA实习的时候，就一直在想Visual Studio可以做得那么优秀，那么有没有能在前端使用的类似于Visual Studio的优秀的IDE。有的，Microsoft的亲儿子，免费开源跨平台的Visual Studio Code来了。不得不说，Microsoft这几年在拥抱开源方面确实做了很多。
    
        Free. Built on open source. Runs everywhere.
        
    
    VScode 不仅可以用来开发前端，也可以用来开发Java、PHP、C++、Python...
    
    插件官网：[https://marketplace.visualstudio.com][3]
    
    VScode在各个方面并不比WebStorm逊色。VSCode拥有非常好的插件生态。具有一个优秀IDE应该有的各种功能特性：智能提示、前端支持、自动修复（插件）、Git/GitHub集成（[GitLens][4]）、历史记录（[Local History][5]）、代码检查（[Code Spell Checker][6]）、主题配色等。

## Visual Studio Code 入门

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571675822872-1024x555.png" alt="" width="1024" height="555" class="alignnone size-large wp-image-1546" />][7]

#### 1\. 命令面板

可以通过F1或Ctrl（Cmd for MAC）+Shift+P打开

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571674346973-3.png" alt="" width="611" height="465" class="alignnone size-full wp-image-1553" />][8]

在框中输入：>Extensions: Show Installed Extensions 即可查看已安装的插件，也可以输入其它命令。

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571674742804.png" alt="" width="686" height="402" class="alignnone size-full wp-image-1543" />][9]

#### 2\. 如何安装插件

##### 安装live server插件

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571674820258.png" alt="" width="380" height="400" class="alignnone size-full wp-image-1544" />][10]

点击左侧工具栏中的Extensions，在框中输入live server也可以是别的插件吗，然后可以看到第一个插件名为：

Live Server。点击Install，即安装该插件。

**该插件的用处**：内置一个Web服务器（Live Server）,可以在开发代码的过程中，随时预览自己的修改是否正确，而无需过于关注Web服务器。

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571675022139.png" alt="" width="619" height="640" class="alignnone size-full wp-image-1545" />][11]

右击“Open With Live Server”即可在浏览器中打开对应Cesium页面： [<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571675093778-1024x540.jpg" alt="" width="1024" height="540" class="alignnone size-large wp-image-1560" />][12]

#### 3\. 常用插件列表

Settings Sync：同步VSCode配置

Debugger for Chrome：VS Code调试在Google Chrome中运行的JavaScript代码

beautify: 格式化代码

Auto Rename Tag: 自动完成头部和尾部闭合标签的同步修改

guides：代码对齐辅助线

filesize：显示当前文件大小、创建修改时间

Todo Tree：快速搜索TODO等注释标记

vetur/VueHelper： **VUE**插件

HTML Snippets：提示初级的h5代码片段，标签等

HTML CSS Support：让html标签写上class，智能提示当前项目所支持的样式。

vscode-icon：让vscode的文件夹目录添加上对应的图标。（如果不生效，在【文件-首选项-文件图标主题】重新选择设置）

path intellisense：文件路径自动补齐。

npm intellisense：require引用包的补齐

bracket pair colorizer：让括号有独立的颜色

tortoiseSvn：svn插件

auto close tag：自动添加html、xml关闭标签

change-case：修改文本的更多明明格式，驼峰命名，下划线分割命名等等

color info：在颜色上悬停光标，就可以预览色块中色彩模型的详细信息、

css peek：追踪至样式表中css类和id定义的地方。在html文件右键菜单，单击选择器时，选择“go to definition ”，会跳转到css样式代码段

eslint：检查js编程中的语法错误

html boilerplate：html模板插件，一键创建html文件

htmlHint：html代码格式检测

intelliSense for CSS class names in HTML：把项目中css文件里的名称，智能提示在html中

JavaScript (ES6) code snippets ：es6代码片段提示

上述插件直接搜索安装即可。

#### 4\. 中文语言包

chinese(Simplified)Language Pack for Visual Studio，看不习惯英文的读者，可以下载安装这个，中文简体语言包。

安装完成之后，重启VSCode：

[<img src="http://blog.coinidea.com/wp-content/uploads/2019/10/1571673977815-1024x555.png" alt="" width="1024" height="555" class="alignnone size-large wp-image-1541" />][13]

网络上有非常多的博主详细的介绍了如何使用Visual Studio Code工具。大家可以打开搜索引擎进行搜索。也可以在Cesium中文网（<http://cesium.coinidea.com/>）上留言。

**Cesium中文网交流QQ群：807482793** Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

 [1]: https://cesium.com/cesiumjs/
 [2]: http://cesium.coinidea.com/topic/138.html
 [3]: https://marketplace.visualstudio.com/
 [4]: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
 [5]: https://marketplace.visualstudio.com/items?itemName=xyz.local-history
 [6]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
 [7]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571675822872.png
 [8]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571674346973-3.png
 [9]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571674742804.png
 [10]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571674820258.png
 [11]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571675022139.png
 [12]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571675093778.jpg
 [13]: http://blog.coinidea.com/wp-content/uploads/2019/10/1571673977815.png
> 本文由 [admin](http://cesium.coinidea.com/member/admin.html) 创作，采用 [知识共享署名 3.0 中国大陆许可协议](http://creativecommons.org/licenses/by/3.0/cn) 进行许可。
可自由转载、引用，但需署名作者且注明文章出处。