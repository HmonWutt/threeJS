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

import { openLink } from "./openLink";
import { changeCursor } from "./cursorChange";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  homeColor: "#f4ec0b",
  skillsColor: "#e53cfb",
  projectsColor: "#6cd6f9",
  contactColor: "#57ff76",
  particleColor: "#ffeded",
  textColor: "#ffffff",
};

gui.addColor(parameters, "homeColor");
gui.addColor(parameters, "skillsColor");
gui.addColor(parameters, "projectsColor");
gui.addColor(parameters, "contactColor");
gui.addColor(parameters, "particleColor");
gui.addColor(parameters, "textColor");

const clock = new THREE.Clock();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
export const scene = new THREE.Scene();
const objectDistance = 4;
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;
const material = new THREE.MeshToonMaterial({
  color: parameters.textColor,
  gradientMap: gradientTexture,
});

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
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
const iframeRenderer = new CSS2DRenderer();

iframeRenderer.setSize(sizes.width, sizes.height);

const parent = document.querySelector("#container");

document.body.appendChild(iframeRenderer.domElement);
var div = document.createElement("div");
div.setAttribute("id", "iframe-container");

var iframe = document.createElement("iframe");

iframe.src = "https://hmonwutt.github.io/frontend.io/";
div.appendChild(iframe);
parent.appendChild(div);

const buttonContainer = document.createElement("div");
const linkContainer = document.createElement("div");
div.appendChild(buttonContainer);
div.appendChild(linkContainer);
buttonContainer.setAttribute("class", "button-container");
linkContainer.setAttribute("class", "button-container");
buttonContainer.setAttribute("id", "button-container");
linkContainer.setAttribute("id", "link-container");

function makeButtonSpan(id, text) {
  const span = document.createElement("span");
  span.setAttribute("id", id);
  const itext = document.createElement("i");
  span.appendChild(itext);
  itext.textContent = text;

  return span;
}
function makeLinkSpan(id, link, text) {
  const span = document.createElement("span");
  span.setAttribute("id", id);

  span.href = link;
  const itext = document.createElement("a");
  span.appendChild(itext);
  itext.textContent = text;
  span.addEventListener("click", () => {
    window.open(link);
  });

  return span;
}
const buttonOne = makeButtonSpan("one", "1");
const buttonTwo = makeButtonSpan("two", "2");
const buttonThree = makeButtonSpan("three", "3");
const linkOne = makeLinkSpan("linkone", "https://hmonsworld.link", "link 1");
const linkTwo = makeLinkSpan("linktwo", "https://choretracker.se", "link 2");
const linkThree = makeLinkSpan(
  "linkthree",
  "https://hmonwutt.github.io/frontend.io/",
  "link 3"
);

buttonContainer.appendChild(buttonOne);
buttonContainer.appendChild(buttonTwo);
buttonContainer.appendChild(buttonThree);
linkContainer.appendChild(linkOne);
linkContainer.appendChild(linkTwo);
linkContainer.appendChild(linkThree);
var object = new CSS2DObject(div);
scene.add(object);

const frame = document.querySelector("iframe");

frame.src = "https://hmonwutt.github.io/frontend.io/";

const buttons = document.querySelectorAll("span");
for (const button of buttons) {
  button.addEventListener("click", () => {
    const buttonID = button.getAttribute("id");
    switch (buttonID) {
      case "one":
        frame.src = "https://hmonsworld.link";
        break;
      case "two":
        frame.src = "https://choretracker.se";
        break;
      case "three":
        frame.src = "https://hmonwutt.github.io/frontend.io/";
        break;
    }
  });
}

let star, star_1, star_2, star_3;

const gltfLoader = new GLTFLoader();
gltfLoader.load("./models/Keys.glb", (glb) => {
  star = glb.scene;
  star.scale.set(0.3, 0.3, 0.3);
  star.position.set(0.9, -0.2, 1);

  star_1 = star.clone();
  star.rotateX(1.23);
  star.rotateY(0.5);
  star_1.position.set(-1, -4, 1);
  star_1.rotateX(1.2);
  star_1.rotateY(0.3);
  star_1.rotateZ(-0.3);
  star_3 = star.clone();
  star_3.scale.set(0.15, 0.15, 0.15);

  star_3.position.set(-3, -8, 1);
  star_3.rotateZ(-0.15);
  star_3.rotateX(0.1);

  star_2 = star.clone();
  star_2.rotateY(-0.25);
  star_2.position.set(-1, -12, 1);

  scene.add(star, star_1, star_2, star_3);
});

//////text

const pointLight = new THREE.PointLight("#ffffff", 1, 100);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1500;
pointLight.shadow.mapSize.height = 1500;
pointLight.position.set(0, 0, 3.5);

scene.add(pointLight);

const geometry = new THREE.PlaneGeometry(12, 29);
const phongMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
});
const plane = new THREE.Mesh(geometry, phongMaterial);
plane.position.set(0, 0, -1);

plane.receiveShadow = true;
scene.add(plane);

class Letters {
  constructor(material, position, letters, size) {
    this.material = material;
    this.position = position;
    this.letters = letters;
    this.size = size;
  }
  getText() {
    let text;
    const fontLoader = new FontLoader();

    fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry(this.letters, {
        font: font,
        size: this.size.size,

        height: this.size.height,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeometry.computeBoundingBox();
      textGeometry.translate(
        -(textGeometry.boundingBox.max.x - 0.01) * 0.5,
        -(textGeometry.boundingBox.max.y - 0.01) * 0.5,
        -(textGeometry.boundingBox.max.z - 0.015) * 0.5
      );
      text = new THREE.Mesh(textGeometry, this.material);
      text.castShadow = true;
      text.position.set(this.position.x, this.position.y, this.position.z);
      scene.add(text);
    });
  }
}
const size_1 = { size: 0.3, height: 0.1 };
const size_2 = { size: 0.15, height: 0.05 };
const size_3 = { size: 0.1, height: 0.03 };
const position_1 = { x: -1.5, y: -0.5, z: 1 };
const position_2 = { x: 1, y: -3, z: 1 };
const position_3 = { x: 1, y: -3.5, z: 1 };
const position_4 = { x: 1, y: -4, z: 1 };
const position_5 = { x: 1, y: -4.5, z: 1 };
const position_6 = { x: 1, y: -5, z: 1 };
const position_7 = { x: 1, y: -11.5, z: 1 };
const position_8 = { x: -2.3, y: -7.2, z: 1 };
const letters_1 = "Hello,world!";
const letters_2 = "Skills";
const skill_1 = "Javascript";
const skill_2 = "CSS";
const skill_3 = "HTML";
const skill_4 = "Python";
const contact = "Get in touch!";

const hello = new Letters(material, position_1, letters_1, size_1);
const skills = new Letters(material, position_2, letters_2, size_1);
const skillone = new Letters(material, position_3, skill_1, size_2);
const skilltwo = new Letters(material, position_4, skill_2, size_2);
const skillthree = new Letters(material, position_5, skill_3, size_2);
const skillfour = new Letters(material, position_6, skill_4, size_2);
const contactme = new Letters(material, position_7, contact, size_2);

hello.getText();
skills.getText();
skillone.getText();
skilltwo.getText();
skillthree.getText();
skillfour.getText();
contactme.getText();

let linkedin, github;
gltfLoader.load("./models/linkedin.glb", (glb) => {
  linkedin = glb.scene;

  linkedin.scale.set(0.25, 0.25, 0.25);
  linkedin.position.set(-1.5, -12, 0.5);
  linkedin.rotateY(0.4);
  linkedin.name = "linkedin";
  scene.add(linkedin); //
});
gltfLoader.load("./models/github_new.glb", (glb) => {
  github = glb.scene;

  github.scale.set(0.25, 0.25, 0.25);
  github.rotateY(0.4);
  github.position.set(1.5, -12, 0.5);
  github.name = "github";
  scene.add(github); //
});

const particlesCount = 500;
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
camera.position.z = 6;
scene.add(cameraGroup);
cameraGroup.add(camera);
scene.fog = new THREE.Fog(0xa0a0a0, 1, 100);

/**
 * Renderer
 */

/**
 * Animate
 */
let scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    if (newSection > 0 && newSection == 0) {
      // scene.add(star);
    }
    if (newSection > 0 && currentSection < newSection) {
      gsap.to(pointLight.position, {
        duration: 0.75,
        ease: "power2.inOut",
        y: `${pointLight.position.y - 4}`,
      });

      const originalColor = { r: 204, g: 164, b: 9 };
      const targetColor = { r: 255, g: 0, b: 0 };
      //keyUp(meshes[currentSection], originalColor, targetColor);
    } else if (newSection > 0 && currentSection > newSection) {
      gsap.to(pointLight.position, {
        duration: 0.75,
        ease: "power2.inOut",
        y: `${pointLight.position.y + 4}`,
      });

      const originalColor = { r: 204, g: 164, b: 9 };
      const targetColor = { r: 255, g: 0, b: 0 };
    } else {
      const referenceColor = star.children[1].children[0].material.color;
      const object = star.children[1];

      // const ref = {
      //   r: Math.round(originalColor.r * 255),
      //   g: Math.round(originalColor.g * 255),
      //   b: Math.round(originalColor.b * 255),
      // };
      // const originalColor = { r: 204, g: 164, b: 9 };
      // const targetColor = { r: 255, g: 0, b: 0 };

      gsap.to(pointLight.position, {
        duration: 0.75,
        ease: "power2.inOut",
        y: "0",
      });
    }
    currentSection = newSection;
  }
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
  if (star_3) {
    click(star_3, rayCaster);
  }
  if (linkedin) {
    openLink(linkedin, rayCaster);
  }
  if (github) {
    openLink(github, rayCaster);
  }
});
let previousTime = 0;

const tick = (t) => {
  material.color.set(parameters.textColor);
  particles.material.color.set(parameters.particleColor);
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // github.rotation.y += Math.PI * 0.5;

  if (star) {
    for (const child of star.children) {
      //const originalColor = { r: 204, g: 164, b: 9 };
      const caseID = child.name;

      switch (caseID) {
        case "Cube002":
          //`rgb(204, 164, 9)`;
          child.children[0].material.color.set(parameters.homeColor);
          break;
        case "Cube003":
          //rgb(192, 25, 204)
          child.children[0].material.color.set(`${parameters.skillsColor}`);
          break;
        case "Cube004":
          //rgb(33, 204, 47)
          child.children[0].material.color.set(`${parameters.projectsColor}`);
          break;
        case "Cube005":
          //rgb(15, 124, 204)
          child.children[0].material.color.set(`${parameters.contactColor}`);
          break;
        default:
      }
    }
  }
  ////
  if (github && linkedin && star && star_1 && star_2 && star_3) {
    rayCaster.setFromCamera(mouse, camera);
    const objects = new THREE.Group();
    objects.add(github, linkedin, star, star_1, star_2); // star_3);
    scene.add(objects);
    changeCursor(objects, rayCaster);
  }
  ///////

  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / sizes.width) * 2 - 1;
    mouse.y = -(e.clientY / sizes.height) * 2 + 1;
  });

  if (github) {
    github.position.x = 1.5 + Math.sin(elapsedTime) * 0.1;
  }
  if (linkedin) {
    linkedin.position.x = 0.8 + Math.sin(elapsedTime) * 0.1;
  }

  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 4 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 4 * deltaTime;

  // Render

  renderer.render(scene, camera);

  iframeRenderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  //TWEEN.update(t);
};

tick();
