import {Town} from './object/Town.js';
import {PostboxFinder} from './object/PostboxFinder.js';
import {$} from './util/util.js';

function main() {
  fetch('https://raw.githubusercontent.com/happyGyu/fe-postbox/step2/randomInfo.json')
    .then(response => response.json())
    .then(init);
}

function init(randomInfo) {
  const town = new Town(randomInfo);
  town.initTown();
  const postboxFinder = new PostboxFinder();
  $(document, 'button').addEventListener('click', postboxFinder.startFind.bind(postboxFinder));
}

main();
