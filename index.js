import { Town } from "./Town.js";
import {PostboxFinder} from './PostboxFinder.js'

function main() {
    const town = new Town();
    town.initTown();
    const postboxFinder = new PostboxFinder()
    document.querySelector('button').addEventListener('click', postboxFinder.startFind.bind(postboxFinder))
}

main();