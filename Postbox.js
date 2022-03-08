import {postBoxMaxSize} from "./constant.js"

class Postbox {
    constructor() {
        this.size = decideSize();
    } 

    static decideSize(){
        return (Math.random()*postBoxMaxSize+1).toFixed(2);
    }

    getTemplate(){
        return `<span class="postbox" data-size=${this.size}>📮</span>`
    }
}