export function changeCursor(obj, rayCaster) {
  let currentIntersect = null;

  const intersectAll = rayCaster.intersectObject(obj); //[0]) || rayCaster.intersectObject(obj[1]);
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
