export function hover(star, rayCaster, currentIntersect) {
  if (star) {
    console.log(star);
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
}
