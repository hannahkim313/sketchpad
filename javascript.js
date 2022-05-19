/**
 * 
 * Element object declarations start here.
 * 
 */

const canvasContainer = document.querySelector(".canvas-container");

/**
 * 
 * Functions declarations start here.
 * 
 */

/**
 * Creates and returns a grid container in a square layout.
 * @param {number} num - Number of grid columns.
 * @returns {object} grid container in a square layout.
 */
function createGrid(num) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    gridContainer.style.display = "grid";
    let gridLayout = "";
    for (let i = 0; i < num; i++) {
        gridLayout += (i === num - 1) ? "auto" : "auto ";
    }
    gridContainer.style.gridTemplateColumns = gridLayout;
    canvasContainer.appendChild(gridContainer);
    return gridContainer;
}

/**
 * Creates and styles grid items of the given grid container.
 * @param {object} gridContainer - Element object of CSS selector.
 * @param {*} num - Number of grid columns squared.
 */
function createGridItems(gridContainer, num) {
    for (let i = 0; i < num; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add(`grid-item-${i + 1}`);
        gridItem.style.width = "50px";
        gridItem.style.height = "50px";
        gridItem.style.backgroundColor = "white";
        gridItem.style.border = "1px solid black";
        gridContainer.appendChild(gridItem);
    }
}

/**
 * 
 * Event listeners start here.
 * 
 */

window.addEventListener("pageshow", () => {
    const gridContainer = createGrid(16);
    createGridItems(gridContainer, 16 ** 2);
});