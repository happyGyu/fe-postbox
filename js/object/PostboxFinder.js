import {delay, insertionSort, $} from '../util/util.js';
import {highlightTownCssPath} from '../constants.js';

export class PostboxFinder {
  constructor() {
    this.postboxData = [];
  }

  startFind() {
    delay(2000).then(() => this.renderFindResult());
    const townNodeArr = Array.from($(document, '.map').children);
    this.updatePostboxData(townNodeArr);
  }

  renderFindResult() {
    this.highlightTown();
    this.printTownID();
    this.printSortedTownID();
  }

  highlightTown() {
    const link = document.createElement('link');
    link.href = highlightTownCssPath;
    link.rel = 'stylesheet';
    $(document, 'head').appendChild(link);
  }

  printTownID() {
    const resultDiv = $(document, '.townID');
    resultDiv.innerText = `${this.postboxData.map(data => data.townID).join(',')} 총 ${
      this.postboxData.length
    }개의 마을입니다.`;
  }

  printSortedTownID() {
    const resultDiv = $(document, '.postboxSize');
    const sortedData = insertionSort(this.postboxData, (a, b) => b.postboxSize - a.postboxSize);
    resultDiv.innerText = `우체통의 크기는 ${sortedData.map(data => data.townID).join(',')}순 입니다.`;
  }

  updatePostboxData(townNodeArr) {
    delay(0).then(() => this.searchPostbox(townNodeArr));
  }

  searchPostbox(townNodeArr) {
    for (let townNode of townNodeArr) {
      const postbox = this.getPostbox(townNode);
      if (postbox) {
        townNode.classList.add('owned');
        const data = {};
        data.townID = townNode.dataset.id;
        data.postboxSize = postbox.dataset.size;
        this.postboxData.push(data);
      }
    }
    townNodeArr.forEach(townNode => {
      const childrenNodeArr = Array.from(townNode.children);
      const townNodeArr = this.filterTownNode(childrenNodeArr);
      if (townNodeArr) this.updatePostboxData(townNodeArr);
    });
  }

  getPostbox(townNode) {
    const childNodesArr = Array.from(townNode.children);
    for (let node of childNodesArr) {
      if (node.className === 'postbox') return node;
    }
  }

  filterTownNode(nodeArr) {
    return nodeArr.filter(node => {
      if (node.className === 'town') return node;
    });
  }
}
