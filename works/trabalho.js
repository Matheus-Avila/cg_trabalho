import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {initRenderer, 
        initCamera,
        InfoBox,
        onWindowResize,
        createGroundPlaneWired,
        degreesToRadians} from "../libs/util/util.js";

// Init
var stats = new Stats();          
var scene = new THREE.Scene(); 
var renderer = initRenderer();

// Camera config
var lookAtVec   = new THREE.Vector3( 0.0, 0.0, 0.0 );
var camPosition = new THREE.Vector3( -30, -30, 50 );
var upVec       = new THREE.Vector3( 0.0, 0, 1.0 );
var vcWidth = 400; 
var vcHeidth = 300;
var camera = new THREE.PerspectiveCamera(45, vcWidth/vcHeidth, 0.1, 8000.0);
camera.position.copy(camPosition);
camera.up.copy(upVec);
camera.lookAt(lookAtVec);
var keyboard = new KeyboardState();
var trackballControls = new TrackballControls( camera, renderer.domElement );

scene.add(new THREE.HemisphereLight());
// initDefaultBasicLight(scene, true);

var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// Plane Config
var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
var planeMaterial = new THREE.MeshPhongMaterial({
    color: "rgba(150, 150, 150)",
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); 

// Car Config
var cubeGeometry = new THREE.BoxGeometry(4, 2, 2); 
var cubeMaterial = new THREE.MeshPhongMaterial({color: "rgba(0, 10, 150)"});
var carro = new THREE.Mesh(cubeGeometry, cubeMaterial);
carro.position.set(0.0, 0.0, 1.5);
carro.translateX(Math.PI/2);
scene.add(carro);

var eixofG = new THREE.CylinderGeometry( 0.1, 0.1, 2.3, 32 );
var eixofM = new THREE.MeshPhongMaterial( {color: 0xffff00} );
var eixof = new THREE.Mesh(eixofG, eixofM);
eixof.position.x = eixof.position.x-1;
eixof.position.z = eixof.position.z-1;
carro.add(eixof);

var eixotG = new THREE.CylinderGeometry( 0.1, 0.1, 2.3, 32 );
var eixotM = new THREE.MeshPhongMaterial( {color: 0xffff00} );
var eixot = new THREE.Mesh(eixotG, eixotM);
eixot.position.x = eixot.position.x+1;
eixot.position.z = eixot.position.z-1;
carro.add(eixot);

var rodaDfG = new THREE.CylinderGeometry( 0.5, 0.5, 0.3, 32 );
var rodaDfM = new THREE.MeshPhongMaterial( {color: 0x000000} );
var rodaDf = new THREE.Mesh(rodaDfG, rodaDfM);
// rodaDf.position.x = rodaDf.position.x+0.5;
rodaDf.position.y = rodaDf.position.y-1.1;
// rodaDf.position.z = rodaDf.position.z-0.5;
eixof.add(rodaDf);

var rodaEfG = new THREE.CylinderGeometry( 0.5, 0.5, 0.3, 32 );
var rodaEfM = new THREE.MeshPhongMaterial( {color: 0x000000} );
var rodaEf = new THREE.Mesh(rodaEfG, rodaEfM);
// rodaEf.position.x = rodaEf.position.x+1;
rodaEf.position.y = rodaEf.position.y+1.1;
// rodaEf.position.z = rodaEf.position.z-1;
eixof.add(rodaEf);

var rodaDtG = new THREE.CylinderGeometry( 0.5, 0.5, 0.3, 32 );
var rodaDtM = new THREE.MeshPhongMaterial( {color: 0x000000} );
var rodaDt = new THREE.Mesh(rodaDtG, rodaDtM);
rodaDt.position.y = rodaDt.position.y-1.1;
eixot.add(rodaDt);

var rodaEtG = new THREE.CylinderGeometry( 0.5, 0.5, 0.3, 32 );
var rodaEtM = new THREE.MeshPhongMaterial( {color: 0x000000} );
var rodaEt = new THREE.Mesh(rodaEtG, rodaEtM);
rodaEt.position.y = rodaEt.position.y+1.1;
eixot.add(rodaEt);

// Car Speed Config
var speed = 0;
var speed_max = 0.5;

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
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

function keyboardUpdate() {
  keyboard.update(); 
  if ( keyboard.pressed("left") ){     
    carro.rotateZ( .05);
  }
  if ( keyboard.pressed("right") ){
    carro.rotateZ( -.05);
  }
  if ( keyboard.pressed("X") ){
    if(speed< speed_max){
      speed = speed + 0.01;
    }
    carro.translateX(-1);
    // var x = eixof.axis;
    // rotateAroundObjectAxis(eixot, )
    // carro.children[0].translateX(  -speed );
  }
  if ( !keyboard.pressed("X") ){
    if(speed> 0){
      speed = speed - 0.02;
      carro.translateX(  -speed );
      // carro.rotateOnAxis(, 0,05);
      // p2.matrixWorld.makeRotationAxis(axis, Math.random());
    }
    
  } 
 
}

render();

function render()
{
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}

