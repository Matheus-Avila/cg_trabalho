import { Car } from "../classes/car.js";
import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';
import {ConvexGeometry} from '../../build/jsm/geometries/ConvexGeometry.js';

var colorCasing = {color:"rgb(150,150,150)"};
var colorBlack = {color:"rgb(50,50,50)"};
var glassOpacity = 0.8
var fundoPrata = -0.3
var largura = 1
var altura = 1
var profundidade = 2.3
var paraChoque = profundidade+0.4
var posRoda = 1.7
var raioRoda = 0.5
var alturaRoda = -1
var buildCar = function (scene, maxSpeed) {
    var maxSpeed = 0.3;
    var maxAngleAxle = 0.1;
    var casing = buildCasing(scene);
    var axle = buildAxle(casing);
    var wheels = buildWheels(axle.front, axle.back);
    buildWheelsTexture(wheels);
    buildCasingContour(casing);
    buildFront(casing);
    buildCasingBack(casing);
    buildFrontBlack(casing);
    buildCasingContourBlackLeft(casing);
    buildCasingContourBlackRight(casing);
    buildBottomFrontBlack(casing);
    buildBottomBlack(casing);
    buildwheelTopBlack(casing);
    buildwheelfrontBlack(casing);
    buildBottomBackBlack(casing);
    buildwheelTopBackBlack(casing);
    buildCasingBlackBack(casing);
    buildCasingBlackBackWhell(casing);
    buildTopBack(casing);
    buildParabrisa(casing);
    buildTopRightFront(casing);
    buildTopLeftFront(casing);
    buildTopRightBack(casing);
    buildTopLeftBack(casing);
    buildTopCenter(casing);
    buildLeftSupport1(casing);
    buildRightSupport1(casing);
    buildLeftSupport2(casing);
    buildRightSupport2(casing);
    buildLeftSupport3(casing);
    buildRightSupport3(casing);
    casing.scale.set(.5,.5,.5)
    casing.rotateZ(degreesToRadians(180))
    scene.add(casing);
    return new Car(casing, maxSpeed, maxAngleAxle);
}

var buildCasing = function (scene)
{
  var points = [];
  //Quadrado central do carro
  points.push(new THREE.Vector3(profundidade, largura, altura));
  points.push(new THREE.Vector3(profundidade, -largura, altura));
  points.push(new THREE.Vector3(-profundidade, largura, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));
  points.push(new THREE.Vector3(profundidade, largura,altura*.4));
  points.push(new THREE.Vector3(profundidade, -largura,altura*.4));
  points.push(new THREE.Vector3(-profundidade, largura,altura*.4));
  points.push(new THREE.Vector3(-profundidade, -largura,altura*.4));
  // // Topo pontudo do carro
  // points.push(new THREE.Vector3(0.2,-largura*0.8,altura*2));
  // points.push(new THREE.Vector3(0.2,largura*0.8,altura*2)); 

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;
    objectcasing.position.z = objectcasing.position.z + 1;

  return objectcasing;
}


var buildTopBack = function (car)
{
  var points = [];
  // Topo pontudo do carro
  points.push(new THREE.Vector3(-profundidade, largura, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));

  points.push(new THREE.Vector3(-profundidade*.6,-largura*0.95,altura*1.08*2*.65));
  points.push(new THREE.Vector3(-profundidade*.6,largura*0.95,altura*1.08*2*.65));
  points.push(new THREE.Vector3(-profundidade*.6,-largura,altura));
  points.push(new THREE.Vector3(-profundidade*.6,largura,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing );
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildParabrisa = function (car)
{
  var points = [];
  // Topo pontudo do carro
  points.push(new THREE.Vector3(profundidade, largura, altura));
  points.push(new THREE.Vector3(profundidade, -largura, altura));
  points.push(new THREE.Vector3(-profundidade, largura, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));
  points.push(new THREE.Vector3(0.2,-largura*0.8,altura*2));
  points.push(new THREE.Vector3(0.2,largura*0.8,altura*2)); 

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial({color: "rgb(50,50,50)",
  opacity: glassOpacity,
  transparent: true
  });
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildTopLeftFront = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(profundidade*1.01, largura*.8*1.01, altura));
  points.push(new THREE.Vector3(profundidade*1.01, largura, altura));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.7*1.01,altura*2));

  //Parte lateral
  points.push(new THREE.Vector3(profundidade*.9*1.01, largura*1.01, altura));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.8*1.03,altura*2*.9));
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildTopRightFront = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(profundidade*1.01, -largura*.8*1.01, altura));
  points.push(new THREE.Vector3(profundidade*1.01, -largura, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.7*1.01,altura*2));

  //Parte lateral
  points.push(new THREE.Vector3(profundidade*.9*1.01, -largura*1.01, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.03,altura*2*.9));
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildTopRightBack = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(-profundidade*1.01, -largura*.8*1.01, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.7*1.01,altura*2));

  //Parte lateral
  points.push(new THREE.Vector3(-profundidade*.9*1.01, -largura*1.01, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.03,altura*2*.9));
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildRightBack = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(-profundidade*1.01, -largura*.8*1.01, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.7*1.01,altura*2));

  //Parte lateral
  points.push(new THREE.Vector3(-profundidade*.9*1.01, -largura*1.01, altura));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.03,altura*2*.9));
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildTopCenter = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(0.2*1.01,largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,-largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.4*1.01,largura*0.8*1.01,altura*2*.958));
  points.push(new THREE.Vector3(0.4*1.01,-largura*0.8*1.01,altura*2*.958));

  points.push(new THREE.Vector3(-0.01,largura*0.8*1.01,altura*2*  .962));
  points.push(new THREE.Vector3(-0.01,-largura*0.8*1.01,altura*2*  .962));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildTopLeftBack = function (car){ 

  var points = [];
  
  //Parte de cima
  points.push(new THREE.Vector3(-profundidade*1.01, largura*.8*1.01, altura));
  points.push(new THREE.Vector3(-profundidade, largura, altura));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.8*1.01,altura*2));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.7*1.01,altura*2));

  //Parte lateral
  points.push(new THREE.Vector3(-profundidade*.9*1.01, largura*1.01, altura));
  points.push(new THREE.Vector3(0.2*1.01,largura*0.8*1.03,altura*2*.9));
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}


var buildLeftSupport1 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(0.4*1.01,largura*0.8*1.01,altura*2*.9));
  points.push(new THREE.Vector3(-0.01,largura*0.8*1.01,altura*2*.9));
  points.push(new THREE.Vector3(0.4*1.01,largura*1.01,altura));
  points.push(new THREE.Vector3(-0.01,largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildRightSupport1 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(0.4*1.01,-largura*0.8*1.01,altura*2*.9));
  points.push(new THREE.Vector3(-0.01,-largura*0.8*1.01,altura*2*.9));
  points.push(new THREE.Vector3(0.4*1.01,-largura*1.01,altura));
  points.push(new THREE.Vector3(-0.01,-largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildLeftSupport2 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(profundidade*.5*1.01,largura*0.8*1.01,altura*2*.76));
  points.push(new THREE.Vector3(profundidade*.6,largura*0.8*1.01,altura*2*.7));
  points.push(new THREE.Vector3(profundidade*.5*1.01,largura*1.01,altura));
  points.push(new THREE.Vector3(profundidade*.6,largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildRightSupport2 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(profundidade*.5*1.01,-largura*0.8*1.01,altura*2*.76));
  points.push(new THREE.Vector3(profundidade*.6,-largura*0.8*1.01,altura*2*.7));
  points.push(new THREE.Vector3(profundidade*.5*1.01,-largura*1.01,altura));
  points.push(new THREE.Vector3(profundidade*.6,-largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}


var buildLeftSupport3 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(-profundidade*.5*1.01,largura*0.8*1.01,altura*2*.7));
  points.push(new THREE.Vector3(-profundidade*.6,largura*0.8*1.01,altura*2*.65));
  points.push(new THREE.Vector3(-profundidade*.5*1.01,largura*1.01,altura));
  points.push(new THREE.Vector3(-profundidade*.6,largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildRightSupport3 = function (car){ 

  var points = [];
  
  points.push(new THREE.Vector3(-profundidade*.5*1.01,-largura*0.8*1.01,altura*2*.7));
  points.push(new THREE.Vector3(-profundidade*.6,-largura*0.8*1.01,altura*2*.65));
  points.push(new THREE.Vector3(-profundidade*.5*1.01,-largura*1.01,altura));
  points.push(new THREE.Vector3(-profundidade*.6,-largura*1.01,altura));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);
}

var buildFront = function (car){

  var points = [];
  //Capo
  points.push(new THREE.Vector3(profundidade, largura, altura));
  points.push(new THREE.Vector3(profundidade, -largura, altura));
  points.push(new THREE.Vector3(profundidade, largura,altura*.4));
  points.push(new THREE.Vector3(profundidade, -largura,altura*.4));

  // Quinas laterais
  points.push(new THREE.Vector3(paraChoque, largura,altura*.5));
  points.push(new THREE.Vector3(paraChoque, -largura,altura*.5));
  points.push(new THREE.Vector3(paraChoque+.4, largura*.6, altura*.5));
  points.push(new THREE.Vector3(paraChoque+.4, -largura*.6, altura*.5));

  // Parachoque prata
  points.push(new THREE.Vector3(paraChoque, largura,0));
  points.push(new THREE.Vector3(paraChoque, -largura,0));
  points.push(new THREE.Vector3(paraChoque+.4, largura*.6, 0));
  points.push(new THREE.Vector3(paraChoque+.4, -largura*.6, 0));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;

  car.add(objectcasing);

}

var buildFrontBlack = function (car){

  var points = [];

  // Parachoque 
  points.push(new THREE.Vector3(paraChoque, largura,0));
  points.push(new THREE.Vector3(paraChoque, -largura,0));
  points.push(new THREE.Vector3(paraChoque+.4, largura*.6, 0));
  points.push(new THREE.Vector3(paraChoque+.4, -largura*.6, 0));
  
  points.push(new THREE.Vector3(1.01*paraChoque, 1.01*largura,0));
  points.push(new THREE.Vector3(1.01*paraChoque, -1.01*largura,0));
  points.push(new THREE.Vector3(1.01*paraChoque+.4, 1.01*largura*.6, 0));
  points.push(new THREE.Vector3(1.01*paraChoque+.4, -1.01*largura*.6, 0));

  points.push(new THREE.Vector3(1.01*paraChoque, 1.01*largura,altura*.1));
  points.push(new THREE.Vector3(1.01*paraChoque, -1.01*largura,altura*.1));
  points.push(new THREE.Vector3(1.01*paraChoque+.4, 1.01*largura*.6, altura*.1));
  points.push(new THREE.Vector3(1.01*paraChoque+.4, -1.01*largura*.6, altura*.1));
  
  points.push(new THREE.Vector3(paraChoque, largura,fundoPrata));
  points.push(new THREE.Vector3(paraChoque, -largura,fundoPrata));
  points.push(new THREE.Vector3(paraChoque+.4, largura*.6, fundoPrata));
  points.push(new THREE.Vector3(paraChoque+.4, -largura*.6, fundoPrata));


  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

  var pointCloud = new THREE.Object3D();  
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(0, 0, .63);
    pointCloud.add(spMesh);
  });

  //  

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshLambertMaterial(colorBlack);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;
    // objectcasing.position.z = objectcasing.position.z + 1;

  car.add(objectcasing);

}

var buildCasingContourBlackLeft = function (car){
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  
  var points = [];
   
  //Contorno rodas dianteiras
  points.push(new THREE.Vector3(posRoda*.65, largura, -altura*.2));
  points.push(new THREE.Vector3(posRoda*.6, largura, -altura*.5));
  points.push(new THREE.Vector3(posRoda*.65, 1.1*largura, -altura*.2));
  points.push(new THREE.Vector3(posRoda*.6, 1.1*largura, -altura*.5));

  //Contorno rodas traseiras
  points.push(new THREE.Vector3(-posRoda*.65, largura, -altura*.2));
  points.push(new THREE.Vector3(-posRoda*.6, largura, -altura*.5));
  points.push(new THREE.Vector3(-posRoda*.65, 1.1*largura, -altura*.2));
  points.push(new THREE.Vector3(-posRoda*.6, 1.1*largura, -altura*.5));

  
    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
  
    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });
  
      
  
    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildCasingContourBlackRight = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);
    
    var points = [];
     
    //Contorno rodas dianteiras
    points.push(new THREE.Vector3(posRoda*.65, -largura, altura*-.2));
    points.push(new THREE.Vector3(posRoda*.6, -largura, -altura*.5));
    points.push(new THREE.Vector3(posRoda*.65, -1.1*largura, altura*-.2));
    points.push(new THREE.Vector3(posRoda*.6, -1.1*largura, -altura*.5));
  
    //Contorno rodas traseiras
    points.push(new THREE.Vector3(-posRoda*.65, -largura, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, -largura, -altura*.5));
    points.push(new THREE.Vector3(-posRoda*.65, -1.1*largura, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, -1.1*largura, -altura*.5));
  
    
      var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
    
      var pointCloud = new THREE.Object3D();  
      points.forEach(function (point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.set(0, 0, .63);
        pointCloud.add(spMesh);
      });
    
        
    
      pointCloud.visible = true;
      var convexCasing = new ConvexGeometry(points);
      var countour = new THREE.MeshLambertMaterial(colorBlack);
      var objectcontour = new THREE.Mesh(convexCasing, countour);
          objectcontour.castShadow = true;
          objectcontour.visible = true;
      
        car.add(objectcontour);
    }

  var buildBottomBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];
      
    //Contorno roda dianteira direita
    points.push(new THREE.Vector3(posRoda*.65, -largura, altura*-.2));
    points.push(new THREE.Vector3(posRoda*.6, -largura, -altura*.5));

    //Contorno roda dianteira esquerda
    points.push(new THREE.Vector3(posRoda*.65, largura, altura*-.2));
    points.push(new THREE.Vector3(posRoda*.6, largura, -altura*.5));

    //Contorno roda traseira direita
    points.push(new THREE.Vector3(-posRoda*.65, -largura, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, -largura, -altura*.5));

    //Contorno roda traseira esquerda
    points.push(new THREE.Vector3(-posRoda*.65, largura, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, largura, -altura*.5));
    

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildBottomFrontBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];
      
    points.push(new THREE.Vector3(paraChoque, largura*1.01,0));
    points.push(new THREE.Vector3(paraChoque, -largura*1.01,0));

    points.push(new THREE.Vector3(paraChoque, largura*1.01,fundoPrata));
    points.push(new THREE.Vector3(paraChoque, -largura*1.01,fundoPrata));

      //Contorno rodas dianteiras perto do parachoque preto
    points.push(new THREE.Vector3(posRoda*1.3, largura*1.01, altura*.4));
    points.push(new THREE.Vector3(posRoda*1.3, -largura*1.01, altura*.4));

    points.push(new THREE.Vector3(posRoda*1.3, largura*1.01, altura*.6));
    points.push(new THREE.Vector3(posRoda*1.3, -largura*1.01, altura*.6));

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildwheelTopBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];

    //Contorno rodas dianteiras em cima preto
    points.push(new THREE.Vector3(posRoda*1.3, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(posRoda*1.3, -largura*1.01, altura*.39));

    points.push(new THREE.Vector3(posRoda*1.3, largura*1.01, altura*.6));
    points.push(new THREE.Vector3(posRoda*1.3, -largura*1.01, altura*.6));

    points.push(new THREE.Vector3(posRoda*.8, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(posRoda*.8, -largura*1.01, altura*.39));

    points.push(new THREE.Vector3(posRoda*.8, largura*1.01, altura*.6));
    points.push(new THREE.Vector3(posRoda*.8, -largura*1.01, altura*.6));    

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildwheelfrontBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];

    points.push(new THREE.Vector3(posRoda*.8, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(posRoda*.8, -largura*1.01, altura*.39));

    points.push(new THREE.Vector3(posRoda*.8, largura*1.01, altura*.6));
    points.push(new THREE.Vector3(posRoda*.8, -largura*1.01, altura*.6));

    //Contorno rodas dianteiras perto do fundo preto
    points.push(new THREE.Vector3(posRoda*.65, -largura*1.1, -altura*.2));
    points.push(new THREE.Vector3(posRoda*.65, largura*1.1, -altura*.2));
    points.push(new THREE.Vector3(posRoda*.55, -largura*1.1, -altura*.2));
    points.push(new THREE.Vector3(posRoda*.55, largura*1.1, -altura*.2));

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
    car.add(objectcontour);
  }

  var buildBottomBackBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];

    points.push(new THREE.Vector3(-posRoda*.65, -largura*1.1, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, -largura*1.1, -altura*.5));

    points.push(new THREE.Vector3(-posRoda*.65, largura*1.1, altura*-.2));
    points.push(new THREE.Vector3(-posRoda*.6, largura*1.1, -altura*.5));    
    
    //Contorno roda traseira direita
    points.push(new THREE.Vector3(-posRoda*.8, -largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-posRoda*.8, -largura*1.01, altura*.6));

    //Contorno roda traseira esquerda
    points.push(new THREE.Vector3(-posRoda*.8, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-posRoda*.8, largura*1.01, altura*.6)); 

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildwheelTopBackBlack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);

    var points = [];  
    
    points.push(new THREE.Vector3(-posRoda*.8, -largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-posRoda*.8, -largura*1.01, altura*.6));

    points.push(new THREE.Vector3(-posRoda*.8, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-posRoda*.8, largura*1.01, altura*.6)); 

    points.push(new THREE.Vector3(-profundidade, -largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-profundidade, -largura*1.01, altura*.6));

    points.push(new THREE.Vector3(-profundidade, largura*1.01, altura*.39));
    points.push(new THREE.Vector3(-profundidade, largura*1.01, altura*.6)); 

    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});

    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });

      

    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshLambertMaterial(colorBlack);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildCasingBlackBack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);
    
    var points = [];
  
    points.push(new THREE.Vector3(-profundidade*1.2*1.01, largura*1.05, altura*1.01*.4));
    points.push(new THREE.Vector3(-profundidade*1.2*1.01, -largura*1.05, altura*1.01*.4));
    points.push(new THREE.Vector3(-profundidade*1.2*1.01, largura*.7*1.05, -altura*1.01*.5));
    points.push(new THREE.Vector3(-profundidade*1.2*1.01, -largura*.7*1.05, -altura*1.01*.5));

    points.push(new THREE.Vector3(-profundidade*1.2, largura*1.05, altura*1.01*.4));
    points.push(new THREE.Vector3(-profundidade*1.2, -largura*1.05, altura*1.01*.4));
    points.push(new THREE.Vector3(-profundidade*1.2, largura*.7*1.05, -altura*1.01*.5));
    points.push(new THREE.Vector3(-profundidade*1.2, -largura*.7*1.05, -altura*1.01*.5));
    
      var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
    
      var pointCloud = new THREE.Object3D();  
      points.forEach(function (point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.set(0, 0, .63);
        pointCloud.add(spMesh);
      });
    
        
    
      pointCloud.visible = true;
      var convexCasing = new ConvexGeometry(points);
      var countour = new THREE.MeshLambertMaterial(colorBlack);
      var objectcontour = new THREE.Mesh(convexCasing, countour);
          objectcontour.castShadow = true;
          objectcontour.visible = true;
      
        car.add(objectcontour);
    }

    var buildCasingBlackBackWhell = function (car){
      var casing = new THREE.MeshPhongMaterial(colorCasing);
      
      var points = [];
  
      points.push(new THREE.Vector3(-profundidade*1.2, largura*1.05, -altura*1.01*.4));
      points.push(new THREE.Vector3(-profundidade*1.2, -largura*1.05, -altura*1.01*.4));
      points.push(new THREE.Vector3(-profundidade*1.2, largura*.7*1.05, -altura*1.01*.5));
      points.push(new THREE.Vector3(-profundidade*1.2, -largura*.7*1.05, -altura*1.01*.5));
      
      points.push(new THREE.Vector3(-profundidade, -largura*1.01, altura*.39));
      points.push(new THREE.Vector3(-profundidade, -largura*1.01, altura*.6));

      points.push(new THREE.Vector3(-profundidade, largura*1.01, altura*.39));
      points.push(new THREE.Vector3(-profundidade, largura*1.01, altura*.6)); 
        var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
      
        var pointCloud = new THREE.Object3D();  
        points.forEach(function (point) {
          var spGeom = new THREE.SphereGeometry(0.2);
          var spMesh = new THREE.Mesh(spGeom, material);
          spMesh.position.set(0, 0, .63);
          pointCloud.add(spMesh);
        });
      
          
      
        pointCloud.visible = true;
        var convexCasing = new ConvexGeometry(points);
        var countour = new THREE.MeshLambertMaterial(colorBlack);
        var objectcontour = new THREE.Mesh(convexCasing, countour);
            objectcontour.castShadow = true;
            objectcontour.visible = true;
        
          car.add(objectcontour);
      }

var buildCasingContour = function (car){
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  
  var points = [];
   
  //Contorno rodas dianteiras
  points.push(new THREE.Vector3(posRoda*.8, largura, altura*.4));
  points.push(new THREE.Vector3(posRoda*.8, -largura, altura*.4));
  points.push(new THREE.Vector3(posRoda*.6, largura, -altura*.3));
  points.push(new THREE.Vector3(posRoda*.6, -largura, -altura*.3));

  //Contorno rodas traseiras
  points.push(new THREE.Vector3(-posRoda*.8, largura, altura*.4));
  points.push(new THREE.Vector3(-posRoda*.8, -largura, altura*.4));
  points.push(new THREE.Vector3(-posRoda*.6, largura, -altura*.3));
  points.push(new THREE.Vector3(-posRoda*.6, -largura, -altura*.3));
  
    var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
  
    var pointCloud = new THREE.Object3D();  
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(0, 0, .63);
      pointCloud.add(spMesh);
    });
  
      
  
    pointCloud.visible = true;
    var convexCasing = new ConvexGeometry(points);
    var countour = new THREE.MeshPhongMaterial(colorCasing);
    var objectcontour = new THREE.Mesh(convexCasing, countour);
        objectcontour.castShadow = true;
        objectcontour.visible = true;
    
      car.add(objectcontour);
  }

  var buildCasingBack = function (car){
    var casing = new THREE.MeshPhongMaterial(colorCasing);
    
    var points = [];
  
    points.push(new THREE.Vector3(-profundidade, largura,altura*.4));
    points.push(new THREE.Vector3(-profundidade, -largura,altura*.4));
    points.push(new THREE.Vector3(-profundidade, largura, altura));
    points.push(new THREE.Vector3(-profundidade, -largura, altura));
    points.push(new THREE.Vector3(-profundidade*1.2, largura, altura));
    points.push(new THREE.Vector3(-profundidade*1.2, -largura, altura));

    //Contorno rodas traseiras
    points.push(new THREE.Vector3(-profundidade*1.2, largura, altura*.4));
    points.push(new THREE.Vector3(-profundidade*1.2, -largura, altura*.4));
    points.push(new THREE.Vector3(-profundidade*1.2, largura*.7, -altura*.3));
    points.push(new THREE.Vector3(-profundidade*1.2, -largura*.7, -altura*.3));
    
      var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)"});
    
      var pointCloud = new THREE.Object3D();  
      points.forEach(function (point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.set(0, 0, .63);
        pointCloud.add(spMesh);
      });
    
        
    
      pointCloud.visible = true;
      var convexCasing = new ConvexGeometry(points);
      var countour = new THREE.MeshPhongMaterial(colorCasing);
      var objectcontour = new THREE.Mesh(convexCasing, countour);
          objectcontour.castShadow = true;
          objectcontour.visible = true;
      
        car.add(objectcontour);
    }

var buildAxle = function (car) {
    var axleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    var axleMaterial = new THREE.MeshLambertMaterial(colorBlack);

    var front = new THREE.Mesh(axleGeometry, axleMaterial);
    front.position.x = front.position.x - posRoda*1.1;
    front.position.z = front.position.z - .25;
    car.add(front);

    var back = new THREE.Mesh(axleGeometry, axleMaterial);
    back.position.x = back.position.x + posRoda*1.1;
    back.position.z = back.position.z - .25;
    car.add(back);

    return { front, back };
}

var buildWheels = function (frontAxle, backAxle) {
    var wheelGeometry = new THREE.CylinderGeometry(raioRoda*1.3, raioRoda*1.3, .2, 40);
    var wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    var rightFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightFrontWheel.position.y = rightFrontWheel.position.y - 1;
    frontAxle.add(rightFrontWheel);

    var leftFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftFrontWheel.position.y = leftFrontWheel.position.y + 1;
    frontAxle.add(leftFrontWheel);

    var rightRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightRearWheel.position.y = rightRearWheel.position.y - 1;
    backAxle.add(rightRearWheel);

    var leftRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftRearWheel.position.y = leftRearWheel.position.y + 1;
    backAxle.add(leftRearWheel);

    return { rightFrontWheel, leftFrontWheel, rightRearWheel, leftRearWheel};
}

var buildWheelsTexture = function (wheels) {

  var textureLoader = new THREE.TextureLoader();
  var calota  = textureLoader.load('util/calota.jpg');
  var wheelGeometry = new THREE.CylinderGeometry(raioRoda, raioRoda, .1, 40);
  var wheelMaterial = new THREE.MeshLambertMaterial();

  var wheelRightFront = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelRightFront.material.map = calota;
  wheelRightFront.position.y = -largura*.1;
  wheels.rightFrontWheel.add(wheelRightFront);
  
  var wheelLeftFront = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelLeftFront.material.map = calota;
  wheelLeftFront.position.y = largura*.1;
  wheels.leftFrontWheel.add(wheelLeftFront);

  var wheelRightback = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelRightback.material.map = calota;
  wheelRightback.position.y = -largura*.1;
  wheels.rightRearWheel.add(wheelRightback);
  
  var wheelLeftback = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelLeftback.material.map = calota;
  wheelLeftback.position.y = largura*.1;
  wheels.leftRearWheel.add(wheelLeftback);
  
}

export { buildCar };