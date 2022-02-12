import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';

var buildSkybox = function (scene) {
    var faceArray = [];
    var textureFront = new THREE.TextureLoader().load( 'textures/skybox/paze_ft.jpg');
    var textureBack = new THREE.TextureLoader().load( 'textures/skybox/paze_bk.jpg');
    var textureTop = new THREE.TextureLoader().load( 'textures/skybox/paze_up.jpg');
    var textureBottom = new THREE.TextureLoader().load( 'textures/skybox/paze_dn.jpg');
    var textureRight = new THREE.TextureLoader().load( 'textures/skybox/paze_rt.jpg');
    var textureLeft = new THREE.TextureLoader().load( 'textures/skybox/paze_lf.jpg');
      
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureFront }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureBack }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureTop }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureBottom }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureRight }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureLeft }));
       
    for (var i = 0; i < 6; i++)
      faceArray[i].side = THREE.BackSide;
       
    var skyboxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000);
    var skybox = new THREE.Mesh( skyboxGeometry, faceArray );
    skybox.rotateX(degreesToRadians(90));
    scene.add( skybox );
    return skybox;
}

export { buildSkybox };