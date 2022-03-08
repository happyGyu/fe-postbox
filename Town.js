import {
  townNum,
  childTownSizeMinRatio,
  childTownSizeMaxRatio,
  townMinLength,
  childTownMarginMaxRatio,
  childTownMarginMinRatio,
} from "./constant.js";

export class Town {
  constructor(mapSize) {
    this.mapSize = mapSize;
  }

  initTown() {
    const mapDiv = document.querySelector(".map");
    this.appendChildTown(mapDiv);
    const childrenTownArr = Array.from(mapDiv.children);
    this.buildTown(childrenTownArr);
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
    const townNum = this.getTownNum();
    const parentTownSize = [parentTown.clientWidth, parentTown.clientHeight];
    for (let i = 0; i < townNum; i++) {
      const townNode = this.getTownNode(parentTownSize);
      if (townNode) parentTown.appendChild(townNode);
    }
  }

  getTownNode(parentTownSize) {
    const townDiv = document.createElement("div");
    townDiv.className = "town";
    const [townWidth, townHeight] = this.getTownSize(parentTownSize, "size");
    const [townTopDownMargin, townLeftRightMargin] = this.getTownSize(
      parentTownSize,
      "margin"
    );
    if (townWidth < townMinLength || townHeight < townMinLength) return;
    townDiv.style.width = `${townWidth}px`;
    townDiv.style["min-height"] = `${townHeight}px`;
    townDiv.style.margin = `${townTopDownMargin}px ${townLeftRightMargin}px`;
    return townDiv;
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

  getTownNum() {
    return Math.floor(Math.random() * townNum + 1);
  }
}
