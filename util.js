export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(), time);
  });
}

// export function getElementByClass(startNode, className) {
// }
