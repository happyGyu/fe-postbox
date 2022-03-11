import {randomBetween} from '../util/util.js';

export class Postbox {
  constructor(maxPostboxSize) {
    this.maxPostboxSize = maxPostboxSize;
    this.size = Postbox.decideSize.bind(this)();
  }

  static decideSize() {
    return randomBetween(1, this.maxPostboxSize).toFixed(2);
  }

  getTemplate() {
    return `<span class="postbox" data-size=${this.size}>📮</span>`;
  }
}
