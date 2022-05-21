/**
 * 
 * Element object declarations start here.
 * 
 */

const canvas = document.querySelector(".canvas");

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
    canvas.appendChild(gridContainer);
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
        gridItem.style.width = "30px";
        gridItem.style.height = "30px";
        gridItem.style.backgroundColor = "#F4F1DE";
        gridItem.style.border = "1px solid #655c44";
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