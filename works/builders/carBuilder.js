import { Car } from "../classes/car.js";
import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';

var buildCar = function (scene, maxSpeed) {
    var maxSpeed = 0.5;
    var casing = buildCasing();
    var axle = buildAxle(casing);
    buildWheels(axle.front, axle.back);
    scene.add(casing);

    return new Car(casing, maxSpeed);
}

var buildCasing = function () {
    var casingGeometry = new THREE.BoxGeometry(4, 2, 2);
    var casingMaterial = new THREE.MeshPhongMaterial({ color: "rgba(0, 10, 150)" });
    var casing = new THREE.Mesh(casingGeometry, casingMaterial);
    casing.position.set(0.0, 0.0, 1.5);
    casing.scale.set(0.4, 0.4, 0.4);
    casing.rotation.set(0, 0, degreesToRadians(180));

    return casing;
}

var buildAxle = function (car) {
    var axleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 32);
    var axleMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    var front = new THREE.Mesh(axleGeometry, axleMaterial);
    front.position.x = front.position.x - 1;
    front.position.z = front.position.z - 1;
    car.add(front);

    var back = new THREE.Mesh(axleGeometry, axleMaterial);
    back.position.x = back.position.x + 1;
    back.position.z = back.position.z - 1;
    car.add(back);

    return { front, back };
}

var buildWheels = function (frontAxle, backAxle) {
    var wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
    var wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    var rodaDf = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rodaDf.position.y = rodaDf.position.y - 1.1;
    frontAxle.add(rodaDf);

    var rodaEf = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rodaEf.position.y = rodaEf.position.y + 1.1;
    frontAxle.add(rodaEf);

    var rodaDt = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rodaDt.position.y = rodaDt.position.y - 1.1;
    backAxle.add(rodaDt);

    var rodaEt = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rodaEt.position.y = rodaEt.position.y + 1.1;
    backAxle.add(rodaEt);
}

export { buildCar };