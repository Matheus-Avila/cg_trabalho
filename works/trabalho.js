import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from './util/KeyboardState.js';
import {
  initRenderer,
  onWindowResize,
  initDefaultBasicLight
} from "../libs/util/util.js";
import * as CameraBuilder from './builders/cameraBuilder.js';
import * as PlaneBuilder from './builders/planeBuilder.js';
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';
import * as MovementControls from './controls/movementControls.js';
import * as GameModeControls from './controls/gameModeControls.js';
import * as TrackControls from './controls/trackControls.js';
import { GameMode } from './util/enums.js';
import { timeCheck } from './util/timeController.js';
import { InfoBox } from "./util/infoBox.js";

var stats = new Stats();
var renderer = initRenderer();
var gameMode = GameMode.Gameplay;
var keyboardState = new KeyboardState();
var timer = new timeCheck();

var scene = new THREE.Scene();
initDefaultBasicLight(scene, true);
PlaneBuilder.buildPlane(scene);
var track = TrackBuilder.buildFirstTrack(scene);
var car = CarBuilder.buildCar(scene);

var camera = CameraBuilder.buildCamera();
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

var cameraTarget = new THREE.Object3D();
car.mesh.add(cameraTarget);
cameraTarget.position.set(car.mesh.position.x + 10, car.mesh.position.y, car.mesh.position.z);

var trackballControls = new TrackballControls(camera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

var infoBox = new InfoBox();
infoBox.showGameplayInfoBox();

render();

function render() {
  stats.update();
  updateGame();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function updateGame() {
  keyboardState.update();
  gameMode = GameModeControls.updateGameMode(keyboardState, gameMode, scene, camera, track, car, cameraHolder, timer, infoBox);

  if (gameMode == GameMode.Gameplay) {
    timer.updateCounter();
    MovementControls.updateMovement(keyboardState, car, track, timer);
    track = TrackControls.updateTrack(keyboardState, scene, track, car, timer);
    cameraMovement();
  }
  else if (gameMode == GameMode.Inspection)
    trackballControls.update();
}

function cameraMovement() {
  var cameraTargetPosition = new THREE.Vector3();
  cameraTarget.getWorldPosition(cameraTargetPosition);
  cameraHolder.position.set(cameraTargetPosition.x - 20, cameraTargetPosition.y - 7, cameraTargetPosition.z + 7);
  camera.lookAt(cameraTargetPosition);
}
