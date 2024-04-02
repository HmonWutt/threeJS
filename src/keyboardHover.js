export function hover(keyboard, rayCaster, currentIntersect) {
  if (keyboard) {
    console.log(keyboard);
    const intersectAll = rayCaster.intersectObject(keyboard);

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
}
