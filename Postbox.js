import { maxPostBoxSize } from "./constant.js";
import { randomBetween } from "./util.js";

export class Postbox {
  constructor() {
    this.size = Postbox.decideSize();
  }

  static decideSize() {
    return randomBetween(1, maxPostBoxSize).toFixed(2)
  }

  getTemplate() {
    return `<span class="postbox" data-size=${this.size}>📮</span>`;
  }
}
