import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
  initRenderer,
  onWindowResize
} from "../libs/util/util.js";
import * as CameraBuilder from './builders/cameraBuilder.js';
import * as PlaneBuilder from './builders/planeBuilder.js';
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';
import { Keyboard } from './util/keyboard.js';
import { showInfoxBox } from './util/infoBox.js';

// Init
var stats = new Stats();
var keyboard = new Keyboard();
var renderer = initRenderer();

// Build the scene
var scene = new THREE.Scene();

scene.add(new THREE.HemisphereLight());
var camera = CameraBuilder.buildCamera();
PlaneBuilder.buildPlane(scene);

var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

var blockSize = 9.7;
var blockDepth = 0.3;
var trackBlocks = TrackBuilder.buildTrack(scene, blockSize, blockDepth);

var maxSpeed = 0.5;
var car = CarBuilder.buildCar(scene, maxSpeed);

// Additional features
var trackballControls = new TrackballControls(camera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
showInfoxBox();

render();

function render() {
  stats.update(); // Update FPS
  keyboard.update(car, trackBlocks, blockSize);
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
