# Cesium中级教程8 - Introduction to Particle Systems 粒子系统入门
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

## What is a particle system? 什么是粒子系统？

![](https://i.loli.net/2019/06/02/5cf395a4c05a042571.png)

粒子系统是一种图形技术，可以模拟复杂的物理效果。粒子系统是小图像的集合，当它们一起观看时，会形成一个更复杂的“模糊”物体，如火、烟、天气或烟花[fireworkds](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Particle%20System%20Fireworks.html&label=Showcases)。通过使用诸如初始位置、速度和寿命等属性指定单个粒子的行为，可以控制这些复杂的效果。

粒子系统效应在电影和电子游戏中很常见。例如，为了表示飞机的损坏，技术艺术家可以使用粒子系统来表示飞机引擎上的爆炸，然后渲染不同的粒子系统，表示飞机坠毁时的烟雾轨迹。

## Particle system basics 粒子系统基础
请看下面基础粒子系统的代码：
```javascript
var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    imageSize : new Cesium.Cartesian2(20, 20),
    startScale : 1.0,
    endScale : 4.0,
    particleLife : 1.0,
    speed : 5.0,
    emitter : new Cesium.CircleEmitter(0.5),
    emissionRate : 5.0,
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
```

![](https://i.loli.net/2019/06/02/5cf395bb2cef088399.gif)

上面的代码创建了一个**ParticleSystem**，一个参数化的对象，用于控制单个粒子对象**Particle**随时间的外观和行为。粒子由粒子发射器产生，有一个位置和类型，存活一段时间，然后消亡。

其中一些属性是动态的。请注意，这里没有使用可用的单色属性*scale*，而是有一个*startScale*和*endScale*。这些允许您指定在粒子的寿命过程中，粒子大小在开始和结束比例之间的转换。*startColor*和*endColor*的工作原理相似。

影响视觉输出的其他方法包括最大和最小属性。对于具有最大和最小输入的每个变量，粒子上该变量的实际值将随机分配到最大和最小输入之间，并在粒子的整个生命周期内静态保持该值。例如，使用最小速度和最大速度作为每个粒子随机选择的速度的界限。允许像这样更改的属性包括*imageSize*、*speed*、*life*和*particleLife*。

## Emitters 发射器
当粒子诞生时，其初始位置和速度矢量由*ParticleEmitter*控制。发射器将每秒生成一些粒子，由*emissionRate*参数指定，根据发射器类型用随机速度初始化。

Cesium有各种各样的粒子发射器，你可以开箱即用。

### BoxEmitter 盒形发射器
*BoxEmitter*在一个盒子内随机取样的位置初始化粒子，并将它们从六个盒子表面中的一个引导出来。它接受*Cartesian3*参数，该参数指定框的宽度、高度和深度尺寸。
```javascript
var particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    color: Cesium.Color.MAGENTA,
    emissionRate: 5.0,
    emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(5.0, 5.0, 5.0)),
    imageSize : new Cesium.Cartesian2(25.0, 25.0),
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
```

![](https://i.loli.net/2019/06/02/5cf395d60158c70420.gif)

### CircleEmitter 圆形发射器
*CircleEmitter*在发射器上轴线方向上的圆形内的随机采样位置初始化粒子。它接受一个指定圆半径的浮点参数。
```javascript
var particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    color: Cesium.Color.MAGENTA,
    emissionRate: 5.0,
    emitter: new Cesium.CircleEmitter(5.0),
    imageSize : new Cesium.Cartesian2(25.0, 25.0),
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
```
![](https://i.loli.net/2019/06/02/5cf395f4baa2e14255.gif)

如果发射器未指定，*CircleEmitter*将作为默认发射器。

### ConeEmitter 锥形发射器
*ConeEmitter*在圆锥体的顶端初始化粒子，并以随机的角度引导它们离开圆锥体。它使用一个指定圆锥体角度的浮点参数。圆锥体沿发射器的上轴定向。
```javascript
var particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    color: Cesium.Color.MAGENTA,
    emissionRate: 5.0,
    emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
    imageSize : new Cesium.Cartesian2(25.0, 25.0),
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
```

![](https://i.loli.net/2019/06/02/5cf3960a069d080506.gif)

### SphereEmitter 球形发射器
*SphereEmitter*在球体内随机取样的位置初始化粒子，并将它们从球体中心向外引导。它使用一个指定球体半径的浮点参数。
```javascript
var particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    color: Cesium.Color.MAGENTA,
    emissionRate: 5.0,
    emitter: new Cesium.SphereEmitter(5.0),
    imageSize : new Cesium.Cartesian2(25.0, 25.0),
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
```

![](https://i.loli.net/2019/06/02/5cf39637e20fc14362.png)

## Configuring particle systems 配置粒子系统
### Particle emission rate 粒子发射率
*emissionRate*控制每秒发射多少粒子，这会改变系统中粒子的密度。
指定一组突*burst*以在指定时间发射粒子burst（如上面的动画所示）。这会增加粒子系统的多样性或爆炸性。

将该属性添加到您的*particleSystem*
```javascript
bursts : [
    new Cesium.ParticleBurst({time : 5.0, minimum : 300, maximum : 500}),
    new Cesium.ParticleBurst({time : 10.0, minimum : 50, maximum : 100}),
    new Cesium.ParticleBurst({time : 15.0, minimum : 200, maximum : 300})
]
```
在给定的时间，这些爆发将在最小和最大粒子之间发射。

### Life of the particle and life of the system 粒子寿命和系统寿命
默认情况下，粒子系统将永远运行。要使粒子系统以设定的持续时间运行，请使用*lifetime*以秒为单位指定持续时间，并将*loop*设置为*false*。
```javascript
lifetime : 16.0,
loop: false
```
将*particleLife*设置为5.0将使系统中的每个粒子都具有该*particleLife*值。要随机化每个粒子的输出，请使用变量*minimumParticleLife*和*maximumArticleLife*。
```javascript
minimumParticleLife: 5.0,
maximumParticleLife: 10.0
```

## Styling particles 样式化粒子
### Color 颜色
粒子的样式是使用*image*和*color*指定的纹理，这些纹理可以在粒子的生命周期中更改以创建动态效果。
下面的代码使烟雾粒子从绿色过渡到白色。
```javascript
startColor : Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
endColor : Cesium.Color.WHITE.withAlpha(0.0),
```

### Size 大小
粒子的大小由*imageSize*控制。要随机化大小，请使用*minimumImageSize.x*和*maximumImageSize.x*控制宽度（以像素为单位），并使用*minimumImageSize.y*和*maximumImageSize.y*控制高度（以像素为单位）。
下列代码创建方形粒子在30到60像素之间：
```javascript
minimumImageSize : new Cesium.Cartesian2(30.0, 30.0),
maximumImageSize : new Cesium.Cartesian2(60.0, 60.0)
```
粒子的大小可以通过*startScale*和*endscale*属性在其生命周期中进行调整，以使粒子随时间增长或收缩。
```javascript
startScale: 1.0,
endScale: 4.0
```

### Speed 速度
速度由*speed*或*minimumSpeed*和*maximumSpeed*控制。
```javascript
minimumSpeed: 5.0,
maximumSpeed: 10.0
```

## UpdateCallback 更新回调
通过应用更新函数，可以进一步自定义粒子系统。对于重力、风或颜色更改等效果，它充当每个粒子的手动更新程序。

项目系统有一个*updateCallback*，它在模拟过程中修改粒子的属性。此函数采用粒子和模拟时间步骤。大多数基于物理的效果将修改速度矢量以改变方向或速度。下面是一个让粒子对重力作出反应的例子：
```javascript
var gravityVector = new Cesium.Cartesian3();
var gravity = -(9.8 * 9.8);
function applyGravity(p, dt) {
    // Compute a local up vector for each particle in geocentric space.
    var position = p.position;

    Cesium.Cartesian3.normalize(position, gravityVector);
    Cesium.Cartesian3.multiplyByScalar(gravityVector, gravity * dt, gravityVector);

    p.velocity = Cesium.Cartesian3.add(p.velocity, gravityVector, p.velocity);
}
```
该函数计算重力矢量，并使用重力加速度来改变粒子的速度。
将重力设置为粒子系统的*updateFunction*：
```JavaScript·
updateCallback : applyGravity
```

## Positioning 定位
使用两个**Matrix4**变换矩阵定位粒子系统：
- *modelMatrix*：将粒子系统从模型转换为世界坐标。
- *emitterModelMatrix*：在粒子系统的局部坐标系中变换粒子系统发射器。

您可以只使用这些转换矩阵中的一个，而将另一个保留为标识矩阵，但为了方便起见，我们提供了这两个矩阵。为了练习创建矩阵，让我们将粒子发射器相对于另一个实体定位。

为我们的粒子系统创建一个着重的实体。打开[Hello World Sandcastle](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Hello%20World.html)示例并添加以下代码以向viewer添加牛奶卡车模型：
```javascript
var entity = viewer.entities.add({
    model : {
        uri : '../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb'
    },
    position : Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678)
});
viewer.trackedEntity = entity;
```

我们想增加一个来自卡车后部的烟雾效果。创建一个模型矩阵，该模型矩阵将定位粒子系统并使其方向与牛奶卡车实体相同。
```javascript
modelMatrix: entity.computeModelMatrix(time, new Cesium.Matrix4())
```

这将粒子系统放置在卡车的中心。为了把它放在卡车的后面，我们可以用平移来创建一个矩阵。
```javascript
function computeEmitterModelMatrix() {
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
    trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}
```

现在，添加粒子系统：
```javascript
var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    
    startColor : Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
    endColor : Cesium.Color.WHITE.withAlpha(0.0),
    
    startScale : 1.0,
    endScale : 4.0,
    
    particleLife : 1.0,
    
    minimumSpeed : 1.0,
    maximumSpeed : 4.0
    
    imageSize : new Cesium.Cartesian2(25, 25),
    emissionRate : 5.0,
    lifetime : 16.0,
    
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4())
    emitterModelMatrix : computeEmitterModelMatrix()
}));
```
![](https://i.loli.net/2019/06/02/5cf396e6869f720092.png)

还要注意，我们可以随时间更新模型或发射器矩阵。例如，如果我们想要在卡车上设置发射器位置的动画，我们可以修改*emitterModelMatrix*，同时保持*modelMatrix*不变。

查看完整示例，请访问[Particle System demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System.html&label=Showcases)

## Learn more 更多知识
有关使用更高级技术的粒子系统达到更酷效果，请参见[粒子系统更多效果](https://cesium.com/docs/tutorials/particle-systems-more-effects/)教程。
![](https://i.loli.net/2019/06/02/5cf3969e9f81160755.gif)

更多示例代码请参考：
- [Particle System Fireworks Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Fireworks.html)
- [Particle Systems Weather](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Weather.html)
- [Particle Systems Tails](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Tails.html)

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/