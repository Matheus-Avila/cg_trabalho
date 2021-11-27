import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
  initRenderer,
  onWindowResize,
  initDefaultBasicLight
} from "../libs/util/util.js";
import * as CameraBuilder from './builders/cameraBuilder.js';
import * as PlaneBuilder from './builders/planeBuilder.js';
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';
import { Keyboard } from './classes/keyboard.js';

// Init

var stats = new Stats();
var keyboard = new Keyboard();
var renderer = initRenderer();

// Build the scene
var scene = new THREE.Scene();
PlaneBuilder.buildPlane(scene);
var track = TrackBuilder.buildFirstTrack(scene);
var car = CarBuilder.buildCar(scene);

var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

var camera = CameraBuilder.buildCamera( );
initDefaultBasicLight(scene, true);
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

function cameraMovement(){
  camera.lookAt(car.mesh.position);
  cameraHolder.position.set(car.mesh.position.x - 20, car.mesh.position.y - 10, car.mesh.position.z + 15);
}

// Additional features
var trackballControls = new TrackballControls(camera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
// showInfoxBox(keyboard);

render();

function render() {
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  keyboard.update();
  keyboard.onMovementKeyPressed(car, track);
  cameraMovement();
  track = keyboard.onChangeTrackKeyPressed(car, track, scene);
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
