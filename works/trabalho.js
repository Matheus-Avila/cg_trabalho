import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from './util/KeyboardState.js';
import {
  initRenderer,
  onWindowResize,
  degreesToRadians
} from "../libs/util/util.js";
import * as CameraBuilder from './builders/cameraBuilder.js';
import * as CameraBuilderMap from './builders/cameraBuilderMap.js';
import * as PlaneBuilder from './builders/planeBuilder.js';
import * as TrackBuilder from './builders/trackBuilder.js';
import * as CarBuilder from './builders/carBuilder.js';
import * as MovementControls from './controls/movementControls.js';
import * as GameModeControls from './controls/gameModeControls.js';
import * as TrackControls from './controls/trackControls.js';
import { GameMode } from './util/constants.js';
import { timeCheck } from './util/timeController.js';
import { InfoBox } from "./util/infoBox.js";
import { SpeedMeter } from "./util/speedMeter.js";

var stats = new Stats();
var renderer = initRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var gameMode = GameMode.Gameplay;
var keyboardState = new KeyboardState();
var timer = new timeCheck();

var scene = new THREE.Scene();
var ambientLight = new THREE.AmbientLight("rgb(150,150,150)");
scene.add(ambientLight);

var plane = PlaneBuilder.buildPlane(scene);
var track = TrackBuilder.buildFirstTrack(scene);
var car = CarBuilder.buildCar(scene);

var camera = CameraBuilder.buildCamera();
var gameplayCameraAngle = new THREE.Vector3(-10, -10, 10);  
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

var cameraTarget = new THREE.Object3D();
car.mesh.add(cameraTarget);
cameraTarget.position.set(car.mesh.position.x + 10, car.mesh.position.y, car.mesh.position.z);

car.mesh.position.set(track.initialBlockPosition[0], track.initialBlockPosition[1], 1.5);

var cameraMap = CameraBuilderMap.buildCameraMap();
scene.add(cameraMap);

var trackballControls = new TrackballControls(camera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

var infoBox = new InfoBox();
infoBox.showGameplayInfoBox();

var speedMeter = new SpeedMeter();

var spotLight = buildSpotLight();
var directionalLight = buildDirectionalLight();

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
  if (gameMode == GameMode.Gameplay || gameMode == GameMode.ThirdPerson) {
    var offset = 10; 
    renderer.setViewport(offset, height-300-offset, 350, 300);  // Set virtual camera viewport  
    renderer.setScissor(offset, height-300-offset, 300, 300); // Set scissor with the same size as the viewport
    renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.setClearColor("rgb(100, 50, 150)");  // Use a darker clear color in the small viewport 
    renderer.clear(); // Clean the small viewport
    renderer.render(scene, cameraMap);  // Render scene of the virtual camera
  }
}

function updateGame() {
  keyboardState.update();
  gameMode = GameModeControls.updateGameMode(
    keyboardState, gameMode, scene, camera, cameraMap, track, car, cameraHolder, timer, infoBox, plane, speedMeter, spotLight);

  if (gameMode == GameMode.Gameplay || gameMode == GameMode.ThirdPerson) {
    timer.updateCounter();
    MovementControls.updateMovement(keyboardState, car, track, timer, true);
    speedMeter.updateSpeed(car.speed);
    track = TrackControls.updateTrack(keyboardState, scene, track, car, timer, speedMeter);
    cameraMovement();
  }
  else if (gameMode == GameMode.Inspection) {
    trackballControls.update();
    MovementControls.updateMovement(keyboardState, car, track, timer, false);
  }
}

function cameraMovement() {
  var cameraTargetPosition = new THREE.Vector3();
  cameraTarget.getWorldPosition(cameraTargetPosition);
  cameraHolder.position.addVectors(cameraTargetPosition, gameplayCameraAngle);
  camera.lookAt(cameraTargetPosition);    
  
  directionalLight.target = car.mesh;
}

function buildSpotLight(){
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.target = car.mesh; 
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.angle = degreesToRadians(40);
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.8;
  spotLight.visible = false;

  camera.add(spotLight);

  return spotLight;
}

function buildDirectionalLight(){
  var directionalLight = new THREE.DirectionalLight(0Xffffff,1);
  directionalLight.position.set(-15, -15, cameraHolder.position.z + 5 );  
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512; 
  directionalLight.shadow.mapSize.height = 512; 
  directionalLight.shadow.camera.near = 0.5; 
  directionalLight.shadow.camera.far = 500;

  cameraHolder.add(directionalLight);

  return directionalLight;
}