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
import * as CameraBuilderMap from './builders/cameraBuilderMap.js';
import * as PlaneBuilder from './builders/planeBuilder.js';
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';
import * as MovementControls from './controls/movementControls.js';
import * as InspectionMovementControls from './controls/inspectionMovementControls.js';
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
var plane = PlaneBuilder.buildPlane(scene);
var track = TrackBuilder.buildFirstTrack(scene);
var car = CarBuilder.buildCar(scene);

var camera = CameraBuilder.buildCamera();
var gameplayCameraAngle = new THREE.Vector3(-10, -10, 10);  
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

var cameraMap = CameraBuilderMap.buildCameraMap();
scene.add(cameraMap);

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
  controlCameras();
  requestAnimationFrame(render);
}

function controlCameras () {
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Set main viewport
  renderer.setViewport(0, 0, width, height); // Reset viewport    
  renderer.setScissorTest(false); // Disable scissor to paint the entire window
  renderer.setClearColor("rgb(80, 70, 170)");    
  renderer.clear();   // Clean the window
  renderer.render(scene, camera);   

  // Set virtual camera viewport 
  var offset = 10; 
  renderer.setViewport(offset, height-300-offset, 400, 300);  // Set virtual camera viewport  
  renderer.setScissor(offset, height-300-offset, 400, 300); // Set scissor with the same size as the viewport
  renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
  renderer.setClearColor("rgb(100, 50, 150)");  // Use a darker clear color in the small viewport 
  renderer.clear(); // Clean the small viewport
  renderer.render(scene, cameraMap);  // Render scene of the virtual camera
}

function updateGame() {
  keyboardState.update();
  gameMode = GameModeControls.updateGameMode(keyboardState, gameMode, scene, camera, track, car, cameraHolder, timer, infoBox, plane);

  if (gameMode == GameMode.Gameplay) {
    timer.updateCounter();
    MovementControls.updateMovement(keyboardState, car, track, timer);
    track = TrackControls.updateTrack(keyboardState, scene, track, car, timer);
    cameraMovement();
  }
  else if (gameMode == GameMode.Inspection)
  {
    trackballControls.update();
    InspectionMovementControls.updateMovement(keyboardState, car);
  }
}

function cameraMovement() {
  var cameraTargetPosition = new THREE.Vector3();
  cameraTarget.getWorldPosition(cameraTargetPosition);
  cameraHolder.position.addVectors(cameraTargetPosition, gameplayCameraAngle);
  camera.lookAt(cameraTargetPosition);             
}
