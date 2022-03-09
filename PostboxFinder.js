// mission2 러프하게 작업중인 파일입니다.
import { delay } from "./util.js";
import { highlightTownCssPath } from "./constant.js";

class PostboxFinder {
  constructor() {
    this.postboxData = [];
  }

  startFind() {
    delay(2000).then(this.highlightTown());
    this.updatePostboxData(townNodeArr);
  }

  highlightTown() {
    const link = document.createElement("link");
    link.href = highlightTownCssPath;
    link.rel = "stylesheet";
    document.querySelector("head").appendChild(link);
  }

  updatePostboxData(townNodeArr) {
    delay(0).then(this.searchPostbox(townNodeArr));
  }

  searchPostbox(townNodeArr) {
    for (let townNode of townNodeArr) {
      const postbox = this.hasPostBox();
      if (postbox) {
        const data = {};
        data.townId = townNode.dataset.id;
        data.postboxSize = postbox.dataset.size;
        this.postboxData.push(data);
      }
    }
    this.rerenderResult();
    //재귀
  }

  hasPostBox(townNode) {
    const childNodesArr = Array.from(townNode.children);
    for (let node of childNodesArr) {
      if (node.className === "postbox") return node;
    }
  }

  rerenderResult() {}
}
