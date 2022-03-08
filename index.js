import { Town } from "./Town.js";

function main() {
    const mapDiv = document.querySelector('.map');
    const town = new Town([mapDiv.clientWidth, mapDiv.clientHeight]);
    town.initTown();
}

main();