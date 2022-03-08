import {postBoxMaxSize} from "./constant.js"

export class Postbox {
    constructor() {
        this.size = Postbox.decideSize();
    } 

    static decideSize(){
        return (Math.random()*postBoxMaxSize+1).toFixed(2);
    }

    getTemplate(){
        return `<span class="postbox" data-size=${this.size}>📮</span>`
    }
}