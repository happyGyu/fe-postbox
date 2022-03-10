export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

export function $(startElement, query) {
  const [queryType, parsedQuery] = checkQueryType(query);
  return searchTargetElement(startElement, queryType, parsedQuery)
}

function searchTargetElement(startElement, queryType, parsedQuery) {
  if (startElement.children.length === 0) return; 
  const childrenArr = Array.from(startElement.children);
  for (let child of childrenArr) { 
    if (child[queryType] === parsedQuery) return child;
    const result = searchTargetElement(child, queryType, parsedQuery);
    if (result) return result;
  }
}

function checkQueryType(query) {
  const identifier = query[0];
  if (identifier === '.') return ['className', query.slice(1)];
  if (identifier === '#') return ['id', query.slice(1)];
  return ['tagName', query.toUpperCase()]; 
}
