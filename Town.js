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

export class Town {
  constructor(mapSize) {
    this.mapSize = mapSize;
    this.townID = 0;
  }

  initTown() {
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
      const [childTownSize, chlidTownMargin] =
        this.getChildTownStyle(parentTownSize);
      const townNode = this.getTownNode(childTownSize, chlidTownMargin);
      if (townNode) parentTown.appendChild(townNode);
    }
  }

  getChildTownStyle(parentTownSize) {
    const townSize = this.getTownSize(parentTownSize, "size");
    const townMargin = this.getTownSize(parentTownSize, "margin");
    return [townSize, townMargin];
  }

  getTownNode(townSize, townMargin) {
    const [townWidth, townHeight] = townSize;
    const [townTopDownMargin, townLeftRightMargin] = townMargin;
    if (townWidth < smallestTownSize || townHeight < smallestTownSize) return;
    this.townID++;

    const townNode = document.createElement("div");
    townNode.className = "town";
    townNode.appendChild(this.getTownNameSpan());

    townNode.style.width = `${townWidth}px`;
    townNode.style.margin = `${townTopDownMargin}px ${townLeftRightMargin}px ${townLeftRightMargin}px ${townTopDownMargin}px`;

    if (this.isTherePostBox()) this.createPostBox(townNode);
    return townNode;
  }

  getTownNameSpan() {
    const span = document.createElement("span");
    span.innerText = this.townID;
    return span;
  }

  isTherePostBox() {
    const random = Math.random();
    return random < postBoxExistingProbability;
  }

  createPostBox(townDiv) {
    const postBox = new Postbox();
    townDiv.insertAdjacentHTML("beforeend", postBox.getTemplate());
  }

  getTownSize(parentTownSize, type) {
    const [parentTownWidth, parentTownHeight] = parentTownSize;
    const childTownMaxRatio =
      type === "size" ? maxTownSizeRatio : maxTownMarginRatio;
    const childTownMinRatio =
      type === "size" ? minTownSizeRatio : minTownMarginRatio;

    const randomRatio =
      Math.random() * (childTownMaxRatio - childTownMinRatio) +
      childTownMinRatio;

    return [parentTownWidth * randomRatio, parentTownHeight * randomRatio];
  }

  getSiblingTownNum() {
    return Math.floor(Math.random() * maxSiblingTownNum + 1);
  }
}
