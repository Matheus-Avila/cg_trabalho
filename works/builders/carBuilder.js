import { Car } from "../classes/car.js";
import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';
import {ConvexGeometry} from '../../build/jsm/geometries/ConvexGeometry.js';

var colorCasing = {color:"rgb(150,150,150)"};
var fundoPrata = -0.1
var largura = 1
var altura = 1
var profundidade = 2.3
var paraChoque = profundidade+0.8
var posRoda = 1.7
var raioRoda = 0.5
var alturaRoda = -1
var buildCar = function (scene, maxSpeed) {
    var maxSpeed = 0.3;
    var maxAngleAxle = 0.3;
    var casing = buildCasing(scene);
    var axle = buildAxle(casing);
    buildWheels(axle.front, axle.back);
    buildCasingContour(casing);
    buildFront(casing);
    buildCasingBack(casing);
    casing.scale.set(.5,.5,.5)
    casing.rotateZ(degreesToRadians(180))
    scene.add(casing);
    return new Car(casing, maxSpeed, maxAngleAxle);
}

var buildCasing = function (scene)
{
  var points = [];
  //Quadrado pontudo do carro
  points.push(new THREE.Vector3(profundidade, largura, altura));
  points.push(new THREE.Vector3(profundidade, -largura, altura));
  points.push(new THREE.Vector3(-profundidade, largura, altura));
  points.push(new THREE.Vector3(-profundidade, -largura, altura));
  points.push(new THREE.Vector3(profundidade, largura,altura*.4));
  points.push(new THREE.Vector3(profundidade, -largura,altura*.4));
  points.push(new THREE.Vector3(-profundidade, largura,altura*.4));
  points.push(new THREE.Vector3(-profundidade, -largura,altura*.4));
  // Topo pontudo do carro
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

  // scene.add(pointCloud);

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;
    objectcasing.position.z = objectcasing.position.z + 1;

  return objectcasing;
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

  // scene.add(pointCloud);

  pointCloud.visible = true;
  var convexCasing = new ConvexGeometry(points);
  var casing = new THREE.MeshPhongMaterial(colorCasing);
  var objectcasing = new THREE.Mesh(convexCasing, casing);
      objectcasing.castShadow = true;
      objectcasing.visible = true;
    // objectcasing.position.z = objectcasing.position.z + 1;

  car.add(objectcasing);

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
  
    car.add(pointCloud);
  
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
    
      car.add(pointCloud);
    
      pointCloud.visible = true;
      var convexCasing = new ConvexGeometry(points);
      var countour = new THREE.MeshPhongMaterial(colorCasing);
      var objectcontour = new THREE.Mesh(convexCasing, countour);
          objectcontour.castShadow = true;
          objectcontour.visible = true;
      
        car.add(objectcontour);
    }

var buildAxle = function (car) {
    var axleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 32);
    var axleMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    var front = new THREE.Mesh(axleGeometry, axleMaterial);
    front.position.x = front.position.x - posRoda;
    front.position.z = front.position.z - .2;
    car.add(front);

    var back = new THREE.Mesh(axleGeometry, axleMaterial);
    back.position.x = back.position.x + posRoda;
    back.position.z = back.position.z - .2;
    car.add(back);

    return { front, back };
}

var buildWheels = function (frontAxle, backAxle) {
    var wheelGeometry = new THREE.TorusGeometry(0.28, 0.3, 10, 10, Math.PI * 2);
    wheelGeometry.rotateX(degreesToRadians(270));
    var wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    var rightFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightFrontWheel.position.y = rightFrontWheel.position.y - 1.1;
    frontAxle.add(rightFrontWheel);

    var leftFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftFrontWheel.position.y = leftFrontWheel.position.y + 1.1;
    frontAxle.add(leftFrontWheel);

    var rightRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightRearWheel.position.y = rightRearWheel.position.y - 1.1;
    backAxle.add(rightRearWheel);

    var leftRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftRearWheel.position.y = leftRearWheel.position.y + 1.1;
    backAxle.add(leftRearWheel);
}

export { buildCar };