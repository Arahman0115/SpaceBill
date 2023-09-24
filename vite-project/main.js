import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


let model;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const nlight = new THREE.AmbientLight(0xfffff0,5)
const flight = new THREE.SpotLight(0x9b870c, 50);
flight.position.set(0, 50, 0);  // Position the light source

scene.add(flight);

flight.position.set(0,0,5);
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 4000);
new OrbitControls(camera,renderer.domElement)
camera.position.z = 35;
camera.position.x=-4;
camera.position.y=3;


const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./Attachments/galaxy3.jpg'), side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

const loader = new GLTFLoader();
loader.load('./Billcypher4.glb', (gltf) => {
  model = gltf.scene;
  //model.lookAt(camera.position);
   // Scale the model
   model.scale.set(1.5, 1.5, 1.5);
  model.position.set(2, 0, 0);  // Set position (x, y, z)
  scene.add(model);  // Add model to scene
});
const tloader = new THREE.TextureLoader();
tloader.load('./Attachments/galaxy3.jpg', function(texture) {
  scene.background = texture;
});

const earth_ = tloader.load('./Attachments/earth.jpeg')
const jupiter_ = tloader.load('./Attachments/jupiter.jpeg')
const neptune_ = tloader.load('./Attachments/Neptune.jpeg')
const moon_ = tloader.load('./Attachments/moon.jpeg')
const mars_ = tloader.load('./Attachments/mars.jpeg')
const saturn_ = tloader.load('./Attachments/Saturn.jpeg')
const sun_ = tloader.load('./Attachments/sun.jpeg')




const earthtexture = new THREE.MeshBasicMaterial({
  map:earth_,

})

const moontexture = new THREE.MeshBasicMaterial({
  map:moon_
})
const neptunetexture = new THREE.MeshBasicMaterial({
  map: neptune_
})
const jupitertexture = new THREE.MeshBasicMaterial({
  map:jupiter_,

})
const marstexture = new THREE.MeshBasicMaterial({
  map:mars_,

})

const saturntexture = new THREE.MeshBasicMaterial({
  map:saturn_,

})

const suntexture = new THREE.MeshBasicMaterial({
  map:sun_,

})
const earth = new THREE.SphereGeometry(0.7,32);

const jupiter = new THREE.SphereGeometry(2,32);

const mars = new THREE.SphereGeometry(.8,32);

const neptune = new THREE.SphereGeometry(1,32);

const moonie = new THREE.SphereGeometry(0.4,32);

const saturn = new THREE.SphereGeometry(1.5,32);

const sun = new THREE.SphereGeometry(5,32);

const saturnring = new THREE.TorusGeometry(2,.2,16,100)

const material = new THREE.MeshBasicMaterial({ map:saturn_, });

// Create mesh
const satring = new THREE.Mesh(saturnring, material);
satring.rotation.z = Math.PI / 2;
scene.add(satring)




const jupiterm = new THREE.Mesh(jupiter,jupitertexture)
scene.add(jupiterm)

const sunm = new THREE.Mesh(sun,suntexture)
scene.add(sunm)

const neptunem = new THREE.Mesh(neptune,neptunetexture)
scene.add(neptunem)

const earthm = new THREE.Mesh(earth,earthtexture)
scene.add(earthm)

const moonm = new THREE.Mesh(moonie,moontexture)
scene.add(moonm)

const marsm = new THREE.Mesh(mars,marstexture)
scene.add(marsm)

const saturnm = new THREE.Mesh(saturn,saturntexture)
scene.add(saturnm)


//
// const ploader = new THREE.TextureLoader();
//ploader.load('./cypher.png', function(texture {
//  scene.add(texture);
//});
//


scene.add(nlight)

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  const i3 = i * 3;

  // Use spherical coordinates to place particles within a sphere
  const radius = 10;  // Radius of the sphere
  const phi = Math.random() * Math.PI * 2;
  const theta = Math.random() * Math.PI;

  // Convert spherical coordinates to Cartesian coordinates
  positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
  positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
  positions[i3 + 2] = radius * Math.cos(theta);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create the material for the particles
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  transparent: true,
  opacity: 0.5,
  color: 0xaaaaaa,
});

// Create the particle system
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

// Position it behind the sunm mesh
particlesMesh.position.set(sunm.position.x-4.5, sunm.position.y +10, sunm.position.z - 6);  // Adjust the position as needed

// Add it to your scene
scene.add(particlesMesh);

// Add to scene
//scene.add(pyramid,flight);


// Position camera

//const RedBUBS = new THREE.ConeGeometry();
//const RedBUBM = new THREE.MeshPhongMaterial(
 // {
  //  side: THREE.DoubleSide,
   // flatShading: true,

  //}
//);

//const RedBUB = new THREE.Mesh(RedBUBS, RedBUBM);
//scene.add(RedBUB, flight,nlight);

let angleEarth = 0;
let angleJupiter = 0;
let angleMars = 0;
let angleNeptune = 0;
let angleSaturn = 0;

let verticalAngle=0;
const radius = 8;
const radius2 = 12;
const radius3 = 16;
const radius4 = 22;
const radius5=27;
const animate = () => {
  requestAnimationFrame(animate);
  particlesMesh.geometry.attributes.position.needsUpdate = true;
  angleEarth += 0.02;

  angleJupiter += 0.01;  // Jupiter rotates slower
  angleMars += 0.025;
  angleNeptune += 0.015;
  angleSaturn += 0.018;

  skybox.rotation.z += 0.001; // This rotates the skyboxs
  jupiterm.position.x = (radius3 * Math.cos(angleJupiter))
  jupiterm.position.z = (radius3 * Math.sin(angleJupiter)) ;
  jupiterm.rotation.y += .05;


  neptunem.position.x = (radius5 * Math.cos(angleNeptune)) ;
  neptunem.position.z = (radius5 * Math.sin(angleNeptune)) ;
  neptunem.rotation.y+=0.05;



  earthm.rotation.y += .05;
  earthm.position.x = radius * Math.cos(angleEarth);
  earthm.position.z = radius * Math.sin(angleEarth);


  // Update Moon's position relative to Earth
  moonm.position.x = earthm.position.x + 1.1 * Math.cos(angleEarth * 2);  // The factor of 2 makes the moon orbit faster
  moonm.position.z = earthm.position.z + 1.1 * Math.sin(angleEarth * 2);
  moonm.rotation.y += .05;


  marsm.rotation.y += .05;
  marsm.position.x = (radius2 * Math.cos(angleMars));
  marsm.position.z = (radius2 * Math.sin(angleMars));


  saturnm.rotation.y += .05;
  saturnm.position.x = (radius4 * Math.cos(angleSaturn));
  saturnm.position.z = (radius4 * Math.sin(angleSaturn));

  satring.position.x = (radius4 * Math.cos(angleSaturn));
  satring.position.z = (radius4 * Math.sin(angleSaturn));
  satring.rotation.y += .02;
  satring.rotation.x += .02;

  sunm.position.x=-4.5;
  sunm.position.y=10;
  sunm.rotation.y+=0.03;



  verticalAngle += 0.02;

  // Move the model up and down if it's loaded
  if (model) {
    model.position.y = .8 * Math.sin(verticalAngle);
  }





  // Rotate mesh


  // Render scene with camera
  renderer.render(scene, camera);
};

// Start animation loop
animate();

