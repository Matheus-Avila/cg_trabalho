import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
  initRenderer,
  InfoBox,
  onWindowResize
} from "../libs/util/util.js";
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';

// Init
var stats = new Stats();
var scene = new THREE.Scene();
var renderer = initRenderer();

// Camera config
var lookAtVec = new THREE.Vector3(0.0, 0.0, 0.0);
var camPosition = new THREE.Vector3(-30, -30, 50);
var upVec = new THREE.Vector3(0.0, 0, 1.0);
var vcWidth = 400;
var vcHeidth = 300;
var camera = new THREE.PerspectiveCamera(45, vcWidth / vcHeidth, 0.1, 8000.0);
camera.position.copy(camPosition);
camera.up.copy(upVec);
camera.lookAt(lookAtVec);
var keyboard = new KeyboardState();
var trackballControls = new TrackballControls(camera, renderer.domElement);

scene.add(new THREE.HemisphereLight());

var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// Plane Config
var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
planeGeometry.translate(0.0, 0.0, -0.3);
var planeMaterial = new THREE.MeshPhongMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

var blockSize = 9.7;
var blockDepth = 0.3;
var trackBlocks = TrackBuilder.buildTrack(scene, blockSize, blockDepth);

var maxSpeed = 0.5;
var car = CarBuilder.buildCar(scene, maxSpeed);

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

render();

function render() {
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}

// Controls Config
function keyboardUpdate() {
  keyboard.update();

  if (keyboard.pressed("left"))
    car.mesh.rotateZ(.05);

  if (keyboard.pressed("right"))
    car.mesh.rotateZ(-.05);

  if (keyboard.pressed("X")) {
    if (car.speed < car.maxSpeed)
      car.speed = car.speed + 0.01;

    if (!verificaPista(car.mesh))
      car.speed = car.speed * 0.5;

    car.mesh.translateX(car.speed);
    // var x = eixof.axis;
    // rotateAroundObjectAxis(eixot, )
    // car.mesh.children[0].translateX(  -car.speed );
  }

  if (!keyboard.pressed("X")) {
    if (car.speed > 0) {
      if (!verificaPista(car.mesh))
        car.speed = car.speed * 0.5;

      car.speed = car.speed - 0.01;
      car.mesh.translateX(car.speed);
      // car.mesh.rotateOnAxis(, 0,05);
      // p2.matrixWorld.makeRotationAxis(axis, Math.random());
    }
  }

  if (keyboard.pressed("down")) {
    if (!verificaPista(car.mesh))
      car.speed = car.speed * 0.5;

    if (car.speed > 0)
      car.speed = .95 * car.speed;
    else
      car.mesh.translateX(-.08);
  }
}

function verificaPista(carro) {
  for (var i = 0; i < trackBlocks.length; i++) {
    if (carro.position.x <= trackBlocks[i].mesh.position.x + blockSize * 1.1 / 2 &&
      carro.position.x >= trackBlocks[i].mesh.position.x - blockSize * 1.1 / 2 &&
      carro.position.y <= trackBlocks[i].mesh.position.y + blockSize * 1.1 / 2 &&
      carro.position.y >= trackBlocks[i].mesh.position.y - blockSize * 1.1 / 2) {
      //console.log("carro: ", carro.position.x, " bloco", i, ", carro: ", carro.position.y);
      return true;
    }
  }
  return false;
}
