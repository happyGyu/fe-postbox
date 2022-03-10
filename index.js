import { Town } from "./Town.js";
import {PostboxFinder} from './PostboxFinder.js'
import { $ } from "./util.js";

function main() {
    const town = new Town();
    town.initTown();
    const postboxFinder = new PostboxFinder()
    $(document, 'BUTTON').addEventListener('click', postboxFinder.startFind.bind(postboxFinder))
}

main();