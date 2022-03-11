import {Town} from './object/Town.js';
import {PostboxFinder} from './object/PostboxFinder.js';
import {$} from './util/util.js';
import {severURL} from './constants.js';

function main() {
  fetch(`${severURL}/info/randomRange`)
    .then(response => response.json())
    .then(init);
}

function init(randomRangeInfo) {
  const town = new Town(randomRangeInfo);
  town.initTown();
  const postboxFinder = new PostboxFinder();
  $(document, 'button').addEventListener('click', postboxFinder.startFind.bind(postboxFinder));
}

main();
