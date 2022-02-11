import * as THREE from  '../build/three.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {ARjs}    from  '../libs/AR/ar.js';
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {InfoBox,
		initDefaultSpotlight,
		getMaxSize,
		degreesToRadians,
	} from "../libs/util/util.js";
import * as CarBuilder from './builders/carBuilder.js';

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 640, 480 );
	//renderer.shadowMap.type = THREE.VSMShadowMap;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.enabled = true;
	
document.body.appendChild( renderer.domElement );

// init scene and camera
var scene	= new THREE.Scene();
var camera = new THREE.Camera();
scene.add(camera);

// array of functions for the rendering loop
var onRenderFcts= [];

//----------------------------------------------------------------------------
// Handle arToolkitSource
// More info: https://ar-js-org.github.io/AR.js-Docs/marker-based/
//var arToolkitSource = new THREEx.ArToolkitSource({
var arToolkitSource = new ARjs.Source({	
	// to read from the webcam
	//sourceType : 'webcam',

	// to read from an image
	//sourceType : 'image',
	//sourceUrl : '../assets/AR/kanjiScene.jpg',

	// to read from a video
	sourceType : 'video',
	sourceUrl : '../assets/AR/kanjiScene.mp4'
})

arToolkitSource.init(function onReady(){
	setTimeout(() => {
		onResize()
	}, 2000);
})

// handle resize
window.addEventListener('resize', function(){
	onResize()
})

function onResize(){
	arToolkitSource.onResizeElement()
	arToolkitSource.copyElementSizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
	}
}

//----------------------------------------------------------------------------
// initialize arToolkitContext
//
// create atToolkitContext
//var arToolkitContext = new THREEx.ArToolkitContext({
var arToolkitContext = new ARjs.Context({
	cameraParametersUrl: '../libs/AR/data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )
	// update scene.visible if the marker is seen
	scene.visible = camera.visible
})

//----------------------------------------------------------------------------
// Create a ArMarkerControls
//
// init controls for camera
//var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
var markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {	
	type : 'pattern',
	patternUrl : '../libs/AR/data/patt.kanji',
	changeMatrixMode: 'cameraTransformMatrix' // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
})
// as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
scene.visible = false;
//----------------------------------------------------------------------------
// Adding object to the scene

// Changes 
createSpotlight(camera, new THREE.Vector3(-5,3,4)); 

var clock = new THREE.Clock();
var mixer = new Array();

onRenderFcts.push(function(){
	renderer.render( scene, camera );
})

var car = CarBuilder.buildCar(scene);
var scale = getMaxSize(car.mesh);
var newScale = 0.5;
car.mesh.rotateX(degreesToRadians(90));
car.mesh.rotateZ(degreesToRadians(90));
car.mesh.position.setZ(0);
car.mesh.scale.set(
	newScale * (1.0/scale),
	newScale * (1.0/scale),
	newScale * (1.0/scale));

// run the rendering loop
requestAnimationFrame(function animate(nowMsec)
{
	var lastTimeMsec= null;	
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	var delta = clock.getDelta();
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	}
	)    
	for(var i = 0; i<mixer.length; i++)
		mixer[i].update( delta );
})

function createSpotlight(camera, initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-10, 30, 40);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.name = "spotLight"
    spotLight.position.copy(position);
    spotLight.castShadow = true;
    spotLight.distance = 0;    
    spotLight.decay = 2;
    spotLight.penumbra = 0.5;
    spotLight.angle = degreesToRadians(40);    
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    camera.add(spotLight);

    var ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = "ambientLight";
    camera.add(ambientLight);

    return spotLight;
}