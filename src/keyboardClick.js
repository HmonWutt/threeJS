import { keyUp } from "./keyUp";
import { keyDown } from "./keyDown";
import { scrollTo } from "./scrollTo";
export function click(keyboard, rayCaster) {
  for (const child of keyboard.children) {
    if (child.isGroup) {
      for (const each of child.children) {
        const intersectModel = rayCaster.intersectObject(each);

        if (intersectModel.length > 0) {
          for (const intersect of intersectModel) {
            let refColor;
            //const originalColor = { r: 204, g: 164, b: 9 };
            const caseID = child.name;

            switch (caseID) {
              case "Cube002":
                refColor = { r: 204, g: 164, b: 9 };
                setTimeout(() => scrollTo(0), 500);

                break;
              case "Cube003":
                setTimeout(() => scrollTo(1), 500);
                refColor = {
                  r: 192,
                  g: 25,
                  b: 204,
                };
                break;
              case "Cube004":
                setTimeout(() => scrollTo(2), 500);
                refColor = { r: 33, g: 204, b: 47 };
                break;
              case "Cube005":
                setTimeout(() => scrollTo(3), 500);
                refColor = { r: 15, g: 124, b: 204 };
                break;
            }
            const targetColor = { r: 255, g: 0, b: 0 };
            keyDown(child);
            keyUp(child, refColor, targetColor);
          }
        }
      }
    }
  }
}
