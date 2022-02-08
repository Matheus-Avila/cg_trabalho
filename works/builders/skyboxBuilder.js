import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';

var buildSkybox = function (scene) {
    var materialArray = [];
    var textureFront = new THREE.TextureLoader().load( 'textures/Daylight Box_Front.bmp');
    var textureBack = new THREE.TextureLoader().load( 'textures/Daylight Box_Back.bmp');
    var textureTop = new THREE.TextureLoader().load( 'textures/Daylight Box_Top.bmp');
    var textureBottom = new THREE.TextureLoader().load( 'textures/Daylight Box_Bottom.bmp');
    var textureRight = new THREE.TextureLoader().load( 'textures/Daylight Box_Right.bmp');
    var textureLeft = new THREE.TextureLoader().load( 'textures/Daylight Box_Left.bmp');
      
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureFront }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureBack }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureTop }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureBottom }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureRight }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: textureLeft }));
       
    for (var i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
       
    var skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
    var skybox = new THREE.Mesh( skyboxGeo, materialArray );
    skybox.rotateX(degreesToRadians(90));
    scene.add( skybox );
    return skybox;
}

export { buildSkybox };