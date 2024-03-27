let rotateSpeed = function () {
  let lastPos, newPos, delta;

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();
  
  return function () {
    newPos = pointLight.position.x
    if (lastPos != null) {
      delta = newPos - lastPos;
    }
    if (delta == 1 || delta == -1) delta = 0;
    if (delta < -1) {
      delta = -delta;
    }

    //if (action) action.timeScale = delta * 100;

    lastPos = newPos;
  };
};
