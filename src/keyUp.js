import * as TWEEN from "@tweenjs/tween.js";
import gsap from "gsap";
export function keyUp(obj, originalColor, targetColor) {
  setTimeout(() => {
    gsap.to(obj.position, {
      duration: 0.5,
      ease: "power2.inOut",
      y: "1",
    });
  }, 500);

  // var tween = new TWEEN.Tween(originalColor)
  //   .to({ r: targetColor.r, g: targetColor.g, b: targetColor.b }, 500)
  //   .repeat(1)
  //   .yoyo(true)
  //   .delay(20)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .onUpdate(function () {
  //     obj.children[0].material.color.set(
  //       `rgb(${originalColor.r}, ${originalColor.g},${originalColor.b})`
  //     );
  //   });
  // tween.keyboardt();
}
