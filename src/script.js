import * as THREE from "three";
import GUI from "lil-gui";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as TWEEN from "@tweenjs/tween.js";
import { hover } from "./starHover";
import { click } from "./starClick";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  homeOriginalColor: "#f4ec0b",
  skillsOriginalColor: "#e53cfb",
  projectOriginalColor: "#6cd6f9",
  contactOriginalColor: "#57ff76",
  particleColor: "#ffeded",
};

gui.addColor(parameters, "homeOriginalColor");
gui.addColor(parameters, "skillsOriginalColor");
gui.addColor(parameters, "projectOriginalColor");
gui.addColor(parameters, "contactOriginalColor");
gui.addColor(parameters, "particleColor");

const clock = new THREE.Clock();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);

const iframeRenderer = new CSS2DRenderer();
iframeRenderer.setSize(sizes.width, sizes.height);
const parent = document.querySelector("#myprojects");
parent.appendChild(iframeRenderer.domElement);
var div = document.createElement("div");
div.setAttribute("id", "iframe-container");
div.style.width = "380px";
div.style.height = "280px";

//div.style.backgroundColor = "#000";

var iframe = document.createElement("iframe");

iframe.style.width = "380px";
iframe.style.height = "280px";
iframe.style.border = "0px";
iframe.src = "https://hmonwutt.github.io/frontend.io/";
div.appendChild(iframe);

var object = new CSS2DObject(div);

let star, star_1, star_2;

const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/Keys.glb", (glb) => {
  star = glb.scene;
  star.scale.set(0.2, 0.2, 0.2);
  star.position.set(0.5, -0.2, 6);

  star_1 = star.clone();
  star.rotateX(1);
  star_1.position.set(-1, -4, 6);
  star_1.rotateX(-4.8);
  star_1.rotateZ(-0.5);

  star_2 = star.clone();
  star_2.scale.set(0.2, 0.2, 0.2);
  star_2.rotateY(-0.25);
  star_2.position.set(-1, -12, 6);

  scene.add(star_1, star_2);
  scene.add(star);
});
gltfLoader.load("/models/retro_pc_monitor.glb", (glb) => {
  console.log("added");
  const laptop = glb.scene;
  const laptopGroup = new THREE.Group();
  laptop.scale.set(6, 6, 1);
  console.log(object);
  //object.position.set(-2, 0, 0);

  object.position.set(-2, -10.2, 0);
  //laptopGroup.add(laptop, object);
  laptop.position.set(1.06, -8.96, 6);

  scene.add(object, laptop);
});

//screen.position.set(0, -9.5, 1.1);

/**
 * Test cube
 *
 */

const objectDistance = 4;
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;
const material = new THREE.MeshToonMaterial({
  gradientMap: gradientTexture,
});
const particlesCount = 300;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
  positions[i * 3 + 1] = (Math.random() - 0.82) * objectDistance * 4;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.particleColor,
  sizeAttenuation: true,
  size: 0.03,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
//const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);

mesh2.position.y = -objectDistance * 1;
mesh3.position.y = -objectDistance * 2;

mesh2.position.x = -2;
mesh3.position.x = 2;

//scene.add(mesh2, mesh3);

/**   light */
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

/**
 * Camera
 */
// Base camera
const cameraGroup = new THREE.Group();

const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(cameraGroup);
cameraGroup.add(camera);

/**
 * Renderer
 */

/**
 * Animate
 */
let scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  star.rotation.y = 0.5;
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  const meshes = [star.children[2], star.children[4], star.children[3]];

  //   if (newSection != currentSection) {
  //     if (newSection > 0 && currentSection < newSection) {
  //       gsap.to(star.position, {
  //         duration: 0.2,
  //         ease: "power2.inOut",
  //         y: `${star.position.y - 4}`,
  //       });

  //       // star.position.y -= 4;
  //       //keyDown(meshes[currentSection]);
  //       const originalColor = { r: 204, g: 164, b: 9 };
  //       const targetColor = { r: 255, g: 0, b: 0 };
  //       //keyUp(meshes[currentSection], originalColor, targetColor);
  //     } else if (newSection > 0 && currentSection > newSection) {
  //       gsap.to(star.position, {
  //         duration: 0.2,
  //         ease: "power2.inOut",
  //         y: `${star.position.y + 4}`,
  //       });
  //       //keyDown(meshes[newSection - 1]);
  //       const originalColor = { r: 204, g: 164, b: 9 };
  //       const targetColor = { r: 255, g: 0, b: 0 };
  //       //keyUp(meshes[newSection - 1], originalColor, targetColor);
  //     } else {
  //       if (star) {
  //         //keyDown(star.children[1]);
  //         const referenceColor = star.children[1].children[0].material.color;
  //         const object = star.children[1];

  //         // const ref = {
  //         //   r: Math.round(originalColor.r * 255),
  //         //   g: Math.round(originalColor.g * 255),
  //         //   b: Math.round(originalColor.b * 255),
  //         // };
  //         const originalColor = { r: 204, g: 164, b: 9 };
  //         const targetColor = { r: 255, g: 0, b: 0 };
  //         //keyUp(star.children[1], originalColor, targetColor);
  //         gsap.to(star.position, {
  //           duration: 0.3,
  //           ease: "power2.inOut",
  //           y: "0",
  //         });
  //       }
  //     }
  //     currentSection = newSection;
  //   }
});

const cursor = {};
cursor.x = 0;
cursor.y = 0;
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

const mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  iframeRenderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

document.addEventListener("click", () => {
  rayCaster.setFromCamera(mouse, camera);
  if (star) {
    click(star, rayCaster);
  }
  if (star_1) {
    click(star_1, rayCaster);
  }
  if (star_2) {
    click(star_2, rayCaster);
  }
});
let previousTime = 0;

const tick = (t) => {
  particles.material.color.set(parameters.particleColor);
  //const sectionMeshes = [mesh2, mesh3];

  if (star) {
    for (const child of star.children) {
      //const originalColor = { r: 204, g: 164, b: 9 };
      const caseID = child.name;

      switch (caseID) {
        case "Cube002":
          //`rgb(204, 164, 9)`;
          child.children[0].material.color.set(
            `${parameters.homeOriginalColor}`
          );
          break;
        case "Cube003":
          //rgb(192, 25, 204)
          child.children[0].material.color.set(
            `${parameters.skillsOriginalColor}`
          );
          break;
        case "Cube004":
          //rgb(33, 204, 47)
          child.children[0].material.color.set(
            `${parameters.projectOriginalColor}`
          );
          break;
        case "Cube005":
          //rgb(15, 124, 204)
          child.children[0].material.color.set(
            `${parameters.contactOriginalColor}`
          );
          break;
        default:
      }
    }
  }
  //////
  let currentIntersect = null;
  rayCaster.setFromCamera(mouse, camera);
  if (star) {
    const intersectAll = rayCaster.intersectObject(star);
    if (intersectAll.length) {
      if (!currentIntersect) {
        document.body.style.cursor = "pointer";
      }
      currentIntersect = intersectAll;
    } else {
      currentIntersect = null;
      document.body.style.cursor = "default";
    }
  }

  ///////

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // for (const mesh of sectionMeshes) {
  //   mesh.rotation.x += deltaTime * 0.1;
  //   mesh.rotation.y += deltaTime * 0.12;
  // }
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / sizes.width) * 2 - 1;
    mouse.y = -(e.clientY / sizes.height) * 2 + 1;
  });

  // if (star) {
  //   star.children[2].rotation.z += deltaTime * 0.2;
  //   //star.rotation.y += deltaTime * 0.1;
  // }
  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  // const parallaxX = cursor.x * 0.5;
  // const parallaxY = -cursor.y * 0.5;
  // cameraGroup.position.x +=
  //   (parallaxX - cameraGroup.position.x) * 3 * deltaTime;
  // cameraGroup.position.y +=
  //   (parallaxY - cameraGroup.position.y) * 3 * deltaTime;

  // Render
  renderer.render(scene, camera);
  iframeRenderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  TWEEN.update(t);
};

tick();
