import {
  maxSiblingTownNum,
  minTownSizeRatio,
  maxTownSizeRatio,
  smallestTownSize,
  maxTownMarginRatio,
  minTownMarginRatio,
  postBoxExistingProbability,
} from "./constant.js";
import { Postbox } from "./Postbox.js";
import { randomBetween } from "./util.js";

export class Town {
  constructor() {
    this.townID = 0;
  }

  initTown() {
    //querySelector 자체 API로 대체 예정
    const mapDiv = document.querySelector(".map");
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
    return Math.floor(randomBetween(1, maxSiblingTownNum));
  }

  getChildTownStyle(parentTownSize) {
    const [parentTownWidth, parentTownHeight] = parentTownSize;
    const childTownSize = [
      parentTownWidth * this.getRandomStyleRatio("size"),
      parentTownHeight * this.getRandomStyleRatio("size"),
    ];
    const childTownMargin = [
      parentTownWidth * this.getRandomStyleRatio("margin"),
      parentTownHeight * this.getRandomStyleRatio("margin"),
    ];
    return [childTownSize, childTownMargin];
  }

  getRandomStyleRatio(type) {
    if (type === "size")
      return randomBetween(minTownSizeRatio, maxTownSizeRatio);
    if (type === "margin")
      return randomBetween(minTownMarginRatio, maxTownMarginRatio);
  }

  getTownNode(townStyle) {
    const [townSize, townMargin] = townStyle;
    const [townWidth, townHeight] = townSize;
    const [townTopDownMargin, townLeftRightMargin] = townMargin;
    if (this.isTownSizeValid(townWidth, townHeight)) return;
    this.townID++;
    const townNode = document.createElement("div");
    townNode.className = "town";
    this.setTownId(townNode);
    townNode.style.width = `${townWidth}px`;
    townNode.style.margin = `${townTopDownMargin}px ${townLeftRightMargin}px`;
    if (this.isTherePostBox()) this.createPostBox(townNode);
    return townNode;
  }

  isTownSizeValid(townWidth, townHeight) {
    return townWidth < smallestTownSize || townHeight < smallestTownSize;
  }

  setTownId(townNode) {
    townNode.dataset.id = this.townID;
    townNode.appendChild(this.getTownIDSpan());
  }

  getTownIDSpan() {
    const span = document.createElement("span");
    span.innerText = this.townID;
    return span;
  }

  isTherePostBox() {
    const randomProbability = randomBetween(0, 1);
    return randomProbability < postBoxExistingProbability;
  }

  createPostBox(townNode) {
    const postBox = new Postbox();
    townNode.insertAdjacentHTML("beforeend", postBox.getTemplate());
  }
}
