# Cesium中级教程9 - Advanced Particle System Effects 高级粒子系统效应
Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/

要了解粒子系统的基础知识，请参见[粒子系统入门](https://cesium.com/docs/tutorials/particle-systems/)教程。

## Weather 天气
![](https://i.loli.net/2019/06/05/5cf7d9cfec1e357005.png)

![](https://i.loli.net/2019/06/05/5cf7d9e7cd09c14561.png)

### Setup 设置

若要生成雪效果，请首先为每个粒子添加雪花图像，然后在*updateParticle*函数中定义粒子的移动行为和其他动态元素。

#### The images 图像
本教程中使用了以下三个图像。左边是雨粒子；中间的图像是雪粒子；右边的图像用于火效果。

![](https://i.loli.net/2019/06/05/5cf7d9fc2793292257.png)

#### The update function 更新函数
更新函数用于定义粒子的移动、排列和可视化。修改粒子的*color*颜色、*imageSize*图像大小和*particleLife*粒子生命周期。我们甚至可以基于到相机距离定义粒子（如下所述）、导入模型或到地球本身的距离来修改它们。

下面是我们针对雪的更新函数：
```javascript
// snow
var snowGravityVector = new Cesium.Cartesian3();
var snowUpdate = function(particle, dt) {
    Cesium.Cartesian3.normalize(particle.position, snowGravityVector);
    Cesium.Cartesian3.multiplyByScalar(snowGravityVector,
                                                            Cesium.Math.randomBetween(-30.0, -300.0),
                                                            snowGravityVector);
    particle.velocity = Cesium.Cartesian3.add(particle.velocity, snowGravityVector, particle.velocity);

    var distance = Cesium.Cartesian3.distance(scene.camera.position, particle.position);
    if (distance > (snowRadius)) {
        particle.endColor.alpha = 0.0;
    } else {
        particle.endColor.alpha = snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
    }
};
```
函数的第一部分使粒子像重力一样下落。更新函数还包含一个距离检查，以便粒子在远离相机时消失。

![](https://i.loli.net/2019/06/05/5cf7da0bf216660231.png)


#### 额外的天气效应
使用雾和大气效果来增强可视化效果，并匹配我们试图复制的天气类型。

*hueshift*沿着颜色光谱改变颜色，*saturationShift*改变了视觉实际需要的颜色与黑白的对比程度，*brightnessShift*改变了颜色的生动程度。

雾密度改变了地球上覆盖物与雾的颜色之间的不透明程度。雾的*minimumBrightness*用来使雾变暗。

```javascript
// snow
scene.skyAtmosphere.hueShift = -0.8;
scene.skyAtmosphere.saturationShift = -0.7;
scene.skyAtmosphere.brightnessShift = -0.33;

scene.fog.density = 0.001;
scene.fog.minimumBrightness = 0.8;
```

### The systems 系统

![](https://i.loli.net/2019/06/05/5cf7da2599e9546165.png)

#### Snow 雪
雪花系统使用*snowflake_particle*图像，并使用*minimumImageSize*和*maximumImageSize*，在该范围内随机创建雪花。
```javascript
var snowParticleSize = scene.drawingBufferWidth / 100.0;
var snowRadius = 100000.0;

var snowSystem = new Cesium.ParticleSystem({
    modelMatrix : new Cesium.Matrix4.fromTranslation(scene.camera.position),
    minimumSpeed : -1.0,
    maximumSpeed : 0.0,
    lifetime : 15.0,
    emitter : new Cesium.SphereEmitter(snowRadius),
    startScale : 0.5,
    endScale : 1.0,
    image : "../../SampleData/snowflake_particle.png",
    emissionRate : 7000.0,
    startColor : Cesium.Color.WHITE.withAlpha(0.0),
    endColor : Cesium.Color.WHITE.withAlpha(1.0),
    minimumImageSize : new Cartesian2(snowParticleSize, snowParticleSize),
    maximumImageSize : new Cartesian2(snowParticleSize * 2.0, snowParticleSize * 2.0),
    updateCallback : snowUpdate
});
scene.primitives.add(snowSystem);
```
#### Rain 雨
雨滴系统使用*circular_particle.png*用于雨滴。*imageSize*用于垂直拉伸图像，使雨水呈现细长的外观。
```javascript
rainSystem = new Cesium.ParticleSystem({
    modelMatrix : new Cesium.Matrix4.fromTranslation(scene.camera.position),
    speed : -1.0,
    lifetime : 15.0,
    emitter : new Cesium.SphereEmitter(rainRadius),
    startScale : 1.0,
    endScale : 0.0,
    image : "../../SampleData/circular_particle.png",
    emissionRate : 9000.0,
    startColor :new Cesium.Color(0.27, 0.5, 0.70, 0.0),
    endColor : new Cesium.Color(0.27, 0.5, 0.70, 0.98),
    imageSize : new Cesium.Cartesian2(rainParticleSize, rainParticleSize * 2),
    updateCallback : rainUpdate
});
scene.primitives.add(rainSystem);
```
雨水更新函数略有不同，因为降雨比降雪快得多。
```javascript
// rain
rainGravityScratch = Cesium.Cartesian3.normalize(particle.position, rainGravityScratch);
rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(rainGravityScratch,
                                                        -1050.0,
                                                        rainGravityScratch);

particle.position = Cesium.Cartesian3.add(particle.position, rainGravityScratch, particle.position);
```
要使环境与场景的气氛匹配，请修改大气和雾以匹配雨水。下面的代码使一个深蓝色的天空被薄雾覆盖。
```javascript
// rain
scene.skyAtmosphere.hueShift = -0.97;
scene.skyAtmosphere.saturationShift = 0.25;
scene.skyAtmosphere.brightnessShift = -0.4;

scene.fog.density = 0.00025;
scene.fog.minimumBrightness = 0.01;
```
获取额外的帮助，请访问[Sandcastle example for both snow and rain](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Weather.html&label=Showcases)

## Comet and rocket tails 彗星和火箭尾部

![](https://i.loli.net/2019/06/05/5cf7da4452eef38032.png)

![](https://i.loli.net/2019/06/05/5cf7da5a6ff0a19811.png)

### Using multiple particle systems 使用多重粒子系统
要创建彗星和火箭尾部，我们需要多个粒子系统。该示例创建的粒子环上的每个位置都是完全独立的粒子系统。这使我们能够更均匀地控制系统的运动方向。可视化此效果的一个简单方法是将*cometOptions.numberOfSystems*限制为2，且*cometOptions.colorOptions*仅包括两种颜色，如下图所示。

![](https://i.loli.net/2019/06/05/5cf7da8d6ab6d14547.png)

为了简化不同的系统集合，创建数组来携带与彗星相关联的独立系统和与火箭例子相关联的独立系统。
```javascript
var rocketSystems = [];
var cometSystems = [];
```

为对象创建两个不同的选项：一个用于彗星Comet版本，另一个用于火箭Rocket版本。这使得两个系统的初始系统数、偏移值等不同，看起来也不同。
```javascript
var cometOptions = {
    numberOfSystems : 100.0,
    iterationOffset : 0.003,
    cartographicStep : 0.0000001,
    baseRadius : 0.0005,

    colorOptions : [{
        red : 0.6,
        green : 0.6,
        blue : 0.6,
        alpha : 1.0
    }, {
        red : 0.6,
        green : 0.6,
        blue : 0.9,
        alpha : 0.9
    }, {
        red : 0.5,
        green : 0.5,
        blue : 0.7,
        alpha : 0.5
    }]
};

var rocketOptions = {
    numberOfSystems : 50.0,
    iterationOffset :  0.1,
    cartographicStep : 0.000001,
    baseRadius : 0.0005,

    colorOptions : [{
        minimumRed : 1.0,
        green : 0.5,
        minimumBlue : 0.05,
        alpha : 1.0
    }, {
        red : 0.9,
        minimumGreen : 0.6,
        minimumBlue : 0.01,
        alpha : 1.0
    }, {
        red : 0.8,
        green : 0.05,
        minimumBlue : 0.09,
        alpha : 1.0
    }, {
        minimumRed : 1,
        minimumGreen : 0.05,
        blue : 0.09,
        alpha : 1.0
    }]
};
```
*colorOptions*是用于随机视觉的颜色数组。每个系统从一个特定的颜色开始，而不是有一组颜色几何，这取决于当前正在创建的系统。在下面的示例中，*i*表示当前迭代轮数。
```javascript
var color = Cesium.Color.fromRandom(options.colorOptions[i % options.colorOptions.length]);
```

### Setup 设置
使用下面的函数作为每个系统的初始化
```javascript
function createParticleSystems(options, systemsArray) {
    var length = options.numberOfSystems;
    for (var i = 0; i < length; ++i) {
        scratchAngleForOffset = Math.PI * 2.0 * i / options.numberOfSystems;
        scratchOffset.x += options.baseRadius * Math.cos(scratchAngleForOffset);
        scratchOffset.y += options.baseRadius * Math.sin(scratchAngleForOffset);

        var emitterModelMatrix = Cesium.Matrix4.fromTranslation(scratchOffset, matrix4Scratch);
        var color = Cesium.Color.fromRandom(options.colorOptions[i % options.colorOptions.length]);
        var force = forceFunction(options, i);

        var item = viewer.scene.primitives.add(new Cesium.ParticleSystem({
            image : getImage(),
            startColor : color,
            endColor : color.withAlpha(0.0),
            particleLife : 3.5,
            speed : 0.00005,
            imageSize : new Cesium.Cartesian2(15.0, 15.0),
            emissionRate : 30.0,
            emitter : new Cesium.CircleEmitter(0.1),
            bursts : [ ],
            lifetime : 0.1,
            forces : force,
            modelMatrix : particlesModelMatrix,
            emitterModelMatrix : emitterModelMatrix
        }));
        systemsArray.push(item);
    }
}
```
由于两个尾部版本都相似，因此可以使用相同的*createParticleSystems*函数来创建其中一个。传入*CometOptions*或*RocketOptions*选项参数以创建不同的效果。

### Create the particle image from scratch 从头开始创建粒子图像
不是从URL加载图像，*getImage*函数是使用HTML画布创建图像。这使得图像创建更加灵活。
```javascript
var particleCanvas;
function getImage() {
    if (!Cesium.defined(particleCanvas)) {
        particleCanvas = document.createElement('canvas');
        particleCanvas.width = 20;
        particleCanvas.height = 20;
        var context2D = particleCanvas.getContext('2d');
        context2D.beginPath();
        context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
        context2D.closePath();
        context2D.fillStyle = 'rgb(255, 255, 255)';
        context2D.fill();
    }
    return particleCanvas;
}
```

### The force function 强制函数
下面使我们的*updateCallback*函数：
```javascript
var scratchCartesian3 = new Cesium.Cartesian3();
var scratchCartographic = new Cesium.Cartographic();
var forceFunction = function(options, iteration) {
    var iterationOffset = iteration;
    var func = function(particle) {
        scratchCartesian3 = Cesium.Cartesian3.normalize(particle.position, new Cesium.Cartesian3());
        scratchCartesian3 = Cesium.Cartesian3.multiplyByScalar(scratchCartesian3, -1.0, scratchCartesian3);

        particle.position = Cesium.Cartesian3.add(particle.position, scratchCartesian3, particle.position);

        scratchCartographic = Cesium.Cartographic.fromCartesian(particle.position,
                                                                Cesium.Ellipsoid.WGS84,
                                                                scratchCartographic);

        var angle = Cesium.Math.PI * 2.0 * iterationOffset / options.numberOfSystems;
        iterationOffset += options.iterationOffset;
        scratchCartographic.longitude += Math.cos(angle) * options.cartographicStep;
        scratchCartographic.latitude += Math.sin(angle) * options.cartographicStep;

        particle.position = Cesium.Cartographic.toCartesian(scratchCartographic);
    };
    return func;
};
```
注意*forceFunction*正在返回函数。返回的*func*是实际的*updateCallback*函数。对于每次迭代，update函数根据*angle*和*iterationOffset*创建不同的旋转偏移量。较小的迭代偏移只会稍微调整角度，允许半径随着系统的继续稳步增大，如彗星示例所示。较大的迭代偏移将更快地改变角度；这将使更紧密、更不稳定的圆柱形输出，如火箭例子中所示。

本教程使用正弦和余弦函数进行循环效果。对于其他的效果，试着做一些形状，比如[Lissajous curve](https://en.wikipedia.org/wiki/Lissajous_curve)，[Gibbs phenomenon](https://en.wikipedia.org/wiki/Gibbs_phenomenon)，或者[square wave](https://en.wikipedia.org/wiki/Square_wave)。

### Relative position 相对位置

![](https://i.loli.net/2019/06/05/5cf7dab813ba867612.png)

使用*modelMatrix*将粒子系统定位在平面后面的适当位置。因为这些系统是垂直的，所以我们需要使用*particleOffset*值进行轻微的偏移。如*createParticleSystems*函数所示，根据迭代，计算每个系统的*emitterModelMatrix*偏移量。
```javascript
// positioning the plane
var planePosition = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 800.0);
var particlesOffset = new Cesium.Cartesian3(-8.950115473940969, 34.852766731753945, -30.235411095432937);

// creating the particles model matrix
var transl = Cesium.Matrix4.fromTranslation(particlesOffset, new Cesium.Matrix4());
var translPosition = Cesium.Matrix4.fromTranslation(planePosition, new Cesium.Matrix4());
var particlesModelMatrix = Cesium.Matrix4.multiplyTransformation(translPosition, transl, new Cesium.Matrix4());
```

## Resources 资源
额外的帮助请访问[Sandcastle example for both tails examples](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Tails.html&label=Showcases)
更多示例代码：
- [Particle System Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System.html&label=Showcases)
- [Particle System Fireworks Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Fireworks.html&label=Showcases)
- [Particle System Weather Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Weather.html&label=Showcases)
- [Particle System Tails Demo](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Particle%20System%20Tails.html&label=Showcases)

**Cesium中文网交流QQ群：807482793**

Cesium中文网：http://cesiumcn.org/ | 国内快速访问：http://cesium.coinidea.com/