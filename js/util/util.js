export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function $(startElement, query) {
  const [queryType, parsedQuery] = parseQuery(query);
  return searchTargetElement(startElement, queryType, parsedQuery);
}

function searchTargetElement(startElement, queryType, parsedQuery) {
  if (startElement.children.length === 0) return;
  const childrenArr = Array.from(startElement.children);
  for (let child of childrenArr) {
    if (child[queryType].split(' ').includes(parsedQuery)) return child;
    const result = searchTargetElement(child, queryType, parsedQuery);
    if (result) return result;
  }
}

function parseQuery(query) {
  const identifier = query[0];
  if (identifier === '.') return ['className', query.slice(1)];
  if (identifier === '#') return ['id', query.slice(1)];
  return ['tagName', query.toUpperCase()];
}

export function insertionSort(arr, func = ascendingCallBack) {
  for (let i = 1; i < arr.length; i++) {
    const currVal = arr[i];
    let j = i - 1;
    while (j >= 0 && func(arr[j], currVal) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currVal;
  }
  return arr;
}

function ascendingCallBack(a, b) {
  return a - b;
}
