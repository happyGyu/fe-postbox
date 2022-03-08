import {
  siblingTownMaxNum,
  childTownSizeMinRatio,
  childTownSizeMaxRatio,
  townMinLength,
  childTownMarginMaxRatio,
  childTownMarginMinRatio,
  postBoxCreatingPossibility
} from "./constant.js";
import { Postbox } from "./Postbox.js";

export class Town {
  constructor(mapSize) {
    this.mapSize = mapSize;
    this.townID = 1;
  }

  initTown() {
    const mapDiv = document.querySelector(".map");
    this.buildTown([mapDiv])
  }

  buildTown(parentTownNodeList) {
    for (let node of parentTownNodeList) {
      this.appendChildTown(node);
      if (!node.children) return;
      const childrenTownArr = Array.from(node.children);
      this.buildTown(childrenTownArr);
    }
  }

  appendChildTown(parentTown) {
    const siblingTownNum = this.getSiblingTownNum();
    const parentTownSize = [parentTown.clientWidth, parentTown.clientHeight];
    for (let i = 0; i < siblingTownNum; i++) {
      const townNode = this.getTownNode(parentTownSize);
      if (townNode) parentTown.appendChild(townNode);
    }
  }

  getTownNode(parentTownSize) {
    const townDiv = document.createElement("div");
    townDiv.className = "town";
    townDiv.appendChild(this.getTownNameSpan())
    const [townWidth, townHeight] = this.getTownSize(parentTownSize, "size");
    const [townTopDownMargin, townLeftRightMargin] = this.getTownSize(
      parentTownSize,
      "margin"
    );
    if (townWidth < townMinLength || townHeight < townMinLength) return;
    this.townID++;
    townDiv.style.width = `${townWidth}px`;
    //townDiv.style["min-height"] = `${townHeight}px`;
    townDiv.style.margin = `${townTopDownMargin}px ${townLeftRightMargin}px ${townLeftRightMargin}px ${townTopDownMargin}px`;
    
    if (this.isTherePostBox()) this.createPostBox(townDiv);
    return townDiv;
  }

  getTownNameSpan() {
    const span = document.createElement('span')
    span.innerText = this.townID;
    return span
  }

  isTherePostBox() {
    const random = Math.random();
    return random < postBoxCreatingPossibility;
  }

  createPostBox(townDiv) {
    const postBox = new Postbox();
    townDiv.insertAdjacentHTML('beforeend', postBox.getTemplate());
  }

  getTownSize(parentTownSize, type) {
    const [parentTownWidth, parentTownHeight] = parentTownSize;
    const childTownMaxRatio =
      type === "size" ? childTownSizeMaxRatio : childTownMarginMaxRatio;
    const childTownMinRatio =
      type === "size" ? childTownSizeMinRatio : childTownMarginMinRatio;

    const randomRatio =
      Math.random() * (childTownMaxRatio - childTownMinRatio) +
      childTownMinRatio;

    return [parentTownWidth * randomRatio, parentTownHeight * randomRatio];
  }

  getSiblingTownNum() {
    return Math.floor(Math.random() * siblingTownMaxNum + 1);
  }
}
