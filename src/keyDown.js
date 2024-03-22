import gsap from "gsap";

export function keyDown(obj) {
  gsap.to(obj.position, {
    duration: 0.5,
    ease: "power2.inOut",
    y: "0.3",
  });
}
