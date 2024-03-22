export function scrollTo(section) {
  document
    .getElementsByTagName("section")
    [section].scrollIntoView({ behavior: "smooth" });
}
