import {Postbox} from './Postbox.js';
import {randomBetween} from '../util/util.js';
import {$} from '../util/util.js';

export class Town {
  constructor(randomInfo) {
    this.randomInfo = randomInfo;
    this.townID = 0;
  }

  initTown() {
    const mapDiv = $(document, '.map');
    this.buildTown([mapDiv]);
  }

  buildTown(parentTownArr) {
    for (let parentTown of parentTownArr) {
      this.giveChildTown(parentTown);
      if (!parentTown.children) return;
      const childrenTownArr = Array.from(parentTown.children);
      this.buildTown(childrenTownArr);
    }
  }

  giveChildTown(parentTown) {
    const siblingTownNum = this.getSiblingTownNum();
    const parentTownSize = [parentTown.clientWidth, parentTown.clientHeight];
    for (let i = 0; i < siblingTownNum; i++) {
      const childTownStyle = this.getChildTownStyle(parentTownSize);
      const townNode = this.getTownNode(childTownStyle);
      if (townNode) parentTown.appendChild(townNode);
    }
  }

  getSiblingTownNum() {
    return Math.floor(randomBetween(1, this.randomInfo.maxSiblingTownNum));
  }

  getChildTownStyle(parentTownSize) {
    const [parentTownWidth, parentTownHeight] = parentTownSize;
    const childTownSize = [
      parentTownWidth * this.getRandomStyleRatio('size'),
      parentTownHeight * this.getRandomStyleRatio('size'),
    ];
    const childTownMargin = [
      parentTownWidth * this.getRandomStyleRatio('margin'),
      parentTownHeight * this.getRandomStyleRatio('margin'),
    ];
    return [childTownSize, childTownMargin];
  }

  getRandomStyleRatio(type) {
    if (type === 'size')
      return randomBetween(this.randomInfo.minTownSizeRatio, this.randomInfo.maxTownSizeRatio);
    if (type === 'margin')
      return randomBetween(this.randomInfo.minTownMarginRatio, this.randomInfo.maxTownMarginRatio);
  }

  getTownNode(townStyle) {
    const [townSize, townMargin] = townStyle;
    const [townWidth, townHeight] = townSize;
    const [townTopDownMargin, townLeftRightMargin] = townMargin;
    if (this.isTownSizeValid(townWidth, townHeight)) return;
    this.townID++;
    const townNode = document.createElement('div');
    townNode.className = 'town';
    this.setTownId(townNode);
    townNode.style.width = `${townWidth}px`;
    townNode.style.margin = `${townTopDownMargin}px ${townLeftRightMargin}px`;
    if (this.isTherePostbox()) this.createPostbox(townNode);
    return townNode;
  }

  isTownSizeValid(townWidth, townHeight) {
    return townWidth < this.randomInfo.smallestTownSize || townHeight < this.randomInfo.smallestTownSize;
  }

  setTownId(townNode) {
    townNode.dataset.id = this.townID;
    townNode.appendChild(this.getTownIDSpan());
  }

  getTownIDSpan() {
    const span = document.createElement('span');
    span.innerText = this.townID;
    return span;
  }

  isTherePostbox() {
    const randomProbability = randomBetween(0, 1);
    return randomProbability < this.randomInfo.postboxExistingProbability;
  }

  createPostbox(townNode) {
    const postbox = new Postbox(this.randomInfo.maxPostboxSize);
    townNode.insertAdjacentHTML('beforeend', postbox.getTemplate());
  }
}
