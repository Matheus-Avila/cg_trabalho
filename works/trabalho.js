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

class bloco {
  constructor(largura, altura, profundidade, tipo, pos_centro){
    this.largura = largura;
    this.altura = altura;
    this.profundidade = profundidade;
    this.tipo = tipo;
    this.forma = new THREE.BoxGeometry(this.altura, this.largura, this.profundidade);
    if(tipo=="inicial"){ this.material = new THREE.MeshPhongMaterial({color: "rgba(250, 10, 150)"});}
    else{ this.material = new THREE.MeshPhongMaterial({color: "rgba(0, 150, 250)"});}
    this.bloc = new THREE.Mesh(this.forma, this.material);
    this.bloc.position.set(pos_centro[0], pos_centro[1], pos_centro[2]);
    if(tipo=="inicial") this.colisao = true;
    else this.colisao = false;
  }
}
var tamanho_bloco = 9.7;


// Plane Config
var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
planeGeometry.translate(0.0, 0.0, -0.3);
var planeMaterial = new THREE.MeshPhongMaterial({
    color: "rgba(150, 150, 150)",
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); 

var bloco_inicial = new bloco(tamanho_bloco,tamanho_bloco,0.3,"inicial",[0,0,-0.1])
scene.add(bloco_inicial.bloc);

var blocos_comuns = [];
//Blocos reta inicial
var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[10,0,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,0,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-10,0,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-20,0,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);
// Blocos curva direita
var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-20,10,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-20,20,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-20,30,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-20,40,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[-10,40,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[0,40,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[10,40,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,40,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,30,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,20,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,10,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

var bloco_comum = new bloco(tamanho_bloco,tamanho_bloco,0.3,"comum",[20,0,-0.1]);
blocos_comuns.push(bloco_comum);
scene.add(bloco_comum.bloc);

// Car Config
var cubeGeometry = new THREE.BoxGeometry(4, 2, 2); 
var cubeMaterial = new THREE.MeshPhongMaterial({color: "rgba(0, 10, 150)"});
var carro = new THREE.Mesh(cubeGeometry, cubeMaterial);
carro.position.set(0.0, 0.0, 1.5);
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

carro.scale.set(0.4,0.4,.4)

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

function detecta_pista1(){
  if(carro.position.x<-20-tamanho_bloco || carro.position.x>20+tamanho_bloco || carro.position.y<-20-tamanho_bloco || carro.position.y>40+tamanho_bloco){
    speed = 0.5*speed;
  }
}

// Controls Config
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
    detecta_pista1()
    carro.translateX(speed);
    // var x = eixof.axis;
    // rotateAroundObjectAxis(eixot, )
    // carro.children[0].translateX(  -speed );
  }
  if ( !keyboard.pressed("X") ){
    if(speed> 0){
      detecta_pista1()
      speed = speed - 0.01;
      carro.translateX(  speed );
      // carro.rotateOnAxis(, 0,05);
      // p2.matrixWorld.makeRotationAxis(axis, Math.random());
    }
  }
  if (keyboard.pressed("down")){
    detecta_pista1()
    if(speed> 0){
      speed = .95*speed;
    }else{
      carro.translateX(-.08);
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

