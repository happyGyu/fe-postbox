export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

export function getElementbyClass(startNode, className) {
  if (startNode.children.length === 0) return;
  const childrenArr = Array.from(startNode.children);
  for (let child of childrenArr) {
    if (child.className === className) return child;
    const result = getElementbyClass(child, className);
    if (result) return result;
  }
}
