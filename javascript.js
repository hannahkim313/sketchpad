/**
 * 
 * Current element object declarations start here.
 * 
 */

const canvas = document.querySelector(".canvas");
const colors = document.querySelectorAll(".color");
const currentColor = document.querySelector(".current-color");

/**
 * 
 * Function declarations start here.
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
        gridItem.classList.add("grid-item");
        gridItem.style.width = "30px";
        gridItem.style.height = "30px";
        gridItem.style.backgroundColor = "#F4F1DE";
        gridItem.style.border = "1px solid #655c44";
        gridContainer.appendChild(gridItem);
    }
}

/**
 * 
 * Function calls start here.
 * 
 */

const gridContainer = createGrid(16);
createGridItems(gridContainer, 16 ** 2);

/**
 * 
 * Newly created element object declarations start here.
 * 
 */

 const gridItems = document.querySelectorAll(".grid-item");

/**
 * 
 * Event listeners start here.
 * 
 */

for (const color of colors) {
    color.addEventListener("click", function(e) {
        const colorProps = window.getComputedStyle(color);
        currentColor.style.backgroundColor =
            colorProps.getPropertyValue("background-color");
    });
}

let mouseDown = false;
const currentColorProps = window.getComputedStyle(currentColor);
for (const gridItem of gridItems) {
    gridItem.addEventListener("mousedown", function(e) {
        mouseDown = true;
        gridItem.style.backgroundColor =
            currentColorProps.getPropertyValue("background-color");
    });
    gridItem.addEventListener("mouseenter", function(e) {
        if (mouseDown === true) gridItem.style.backgroundColor =
            currentColorProps.getPropertyValue("background-color");
    })
    gridItem.addEventListener("mouseup", function(e) {
        mouseDown = false;
        gridItem.removeEventListener("mousedown", e);
    })
 }