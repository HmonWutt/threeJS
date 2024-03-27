export function openLink(obj, rayCaster) {
  let link;

  if (obj.name == "github") {
    link = "https://github.com/HmonWutt";
  } else {
    link = "https://www.linkedin.com/in/wutt-hmon-8a87b01b5/";
  }
  const intersectModel = rayCaster.intersectObject(obj);

  if (intersectModel.length > 0) {
    window.open(link);
  }
}
