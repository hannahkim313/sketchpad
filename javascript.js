/**
 * 
 * Current element object declarations start here.
 * 
 */

const canvas = document.querySelector(".canvas");
const colors = document.querySelectorAll(".color");
const currentColor = document.querySelector(".current-color");
const title = document.querySelector(".title");
const clearBtn = document.querySelector(".clear-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const gradientBtn = document.querySelector(".gradient-btn");
const colorDropperBtn = document.querySelector(".color-dropper-btn");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".grid-size");

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
    if (canvas.hasChildNodes() === true) {
        canvas.removeChild(canvas.firstChild);
    }
    canvas.appendChild(gridContainer);
    return gridContainer;
}

/**
 * Creates and styles grid items of the given grid container.
 * @param {object} gridContainer - Element object of CSS selector.
 * @param {number} num - Number of grid columns.
 */
function createGridItems(gridContainer, num) {
    const gridItemSize = 480 / Math.sqrt(num);
    for (let i = 0; i < num; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.style.width = `${gridItemSize}px`;
        gridItem.style.height = `${gridItemSize}px`;
        gridItem.style.backgroundColor = "rgb(255, 255, 255)";
        gridContainer.appendChild(gridItem);
    }
}

/**
 * Randomly generates a rgb color code.
 * @returns {string} a rgb color code.
 */
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Gets the rgb value of the parameter and adds 1/10 of the remaining
 * distance from the current rgb value to 255 and returns the new color
 * values combined.
 * @param {object} gradientColor - CSS background-color property of an element.
 * @returns {string} rgb value of new color.
 */
function createGradient(gradientColor) {
    const leftParenIndex = gradientColor.indexOf("(");
    const rightParenIndex = gradientColor.indexOf(")");
    let commaIndex = gradientColor.indexOf(",");
    let spaceIndex = gradientColor.indexOf(" ");

    const r = gradientColor.slice(leftParenIndex + 1, commaIndex);
    gradientColor = gradientColor.replace(",", ".");
    commaIndex = gradientColor.indexOf(",");
    const g = gradientColor.slice(spaceIndex + 1, commaIndex);
    gradientColor = gradientColor.replace(" ", ".");
    spaceIndex = gradientColor.indexOf(" ");
    const b = gradientColor.slice(spaceIndex + 1, rightParenIndex);

    const rNew = parseInt(r) + Math.round((255 - r) / 10);;
    const gNew = parseInt(g) + Math.round((255 - g) / 10);;
    const bNew = parseInt(b) + Math.round((255 - b) / 10);;
    
    return `rgb(${rNew}, ${gNew}, ${bNew})`;
}

/**
 * Draws colors on the canvas based on different mouse events.
 */
function drawColors() {
    for (const gridItem of gridItemsList) {
        gridItem.addEventListener("dragstart", function(e) {
            e.preventDefault();
        });
        gridItem.addEventListener("mousedown", function(e) {
            mouseDown = true;
            gradientColor = currentColorProps.getPropertyValue("background-color");
            if (rainbowBtn.value === "on") {
                gridItem.style.backgroundColor = getRandomColor();
            } else if (gradientBtn.value === "on") {
                gridItem.style.backgroundColor = createGradient(gradientColor);
                gradientColor = createGradient(gradientColor);
            } else if (colorDropperBtn.value === "on") {
                const gridItemProps = window.getComputedStyle(gridItem);
                currentColor.style.backgroundColor = gridItemProps.getPropertyValue("background-color");
            } else {
                gridItem.style.backgroundColor =
                    currentColorProps.getPropertyValue("background-color");
            }
        });
        gridItem.addEventListener("mouseenter", function(e) {
            if (mouseDown === true) {
                if (rainbowBtn.value === "on") {
                    gridItem.style.backgroundColor = getRandomColor();
                } else if (gradientBtn.value === "on") {
                    gridItem.style.backgroundColor = createGradient(gradientColor);
                    gradientColor = createGradient(gradientColor);
                } else {
                    gridItem.style.backgroundColor =
                        currentColorProps.getPropertyValue("background-color");
                }
            }
        });
        gridItem.addEventListener("mouseup", function(e) {
            mouseDown = false;
            gridItem.removeEventListener("mousedown", e);
        });
     }
}

/**
 * 
 * Variable declarations start here.
 * 
 */

let gridContainer = createGrid(16);
let gridItems = createGridItems(gridContainer, 16 ** 2);
let mouseDown = false;
const currentColorProps = window.getComputedStyle(currentColor);

/**
 * 
 * Newly created element object declarations start here.
 * 
 */

let gridItemsList = document.querySelectorAll(".grid-item");

/**
 * 
 * Event listeners start here.
 * 
 */

window.addEventListener("pageshow", function(e) {
    drawColors();
});

for (const color of colors) {
    color.addEventListener("click", function(e) {
        const colorProps = window.getComputedStyle(color);
        currentColor.style.backgroundColor =
            colorProps.getPropertyValue("background-color");
    });
}

title.addEventListener("click", function(e) {
    const oldTitle = title.textContent;
    title.textContent = prompt("Give your masterpiece a short and sweet name!");
    if (title.textContent === "") title.textContent = oldTitle;
    while (title.textContent.length > 25) {
        title.textContent = prompt("Your title isn't short enough!");
    }
});

slider.addEventListener("input", function(e) {
    sliderValue.textContent = `${slider.value} x ${slider.value}`;
    gridContainer = createGrid(slider.value);
    gridItems = createGridItems(gridContainer, slider.value ** 2);
    gridItemsList = document.querySelectorAll(".grid-item");
    drawColors();
});

clearBtn.addEventListener("click", function(e) {
    for (const gridItem of gridItemsList) {
        gridItem.style.backgroundColor = "rgb(255, 255, 255)";
    }
});

rainbowBtn.addEventListener("click", function(e) {
    if (rainbowBtn.value === "off") {
        rainbowBtn.value = "on";
        gradientBtn.value = "off";
        colorDropperBtn.value = "off";
        rainbowBtn.style.backgroundColor = "rgb(227, 227, 227)";
        gradientBtn.style.backgroundColor = "rgb(255, 255, 255)";
        colorDropperBtn.style.backgroundColor = "rgb(255, 255, 255)";
    } else if (rainbowBtn.value === "on") {
        rainbowBtn.value = "off";
        rainbowBtn.style.backgroundColor = "rgb(255, 255, 255)";
    }
});

gradientBtn.addEventListener("click", function(e) {
    if (gradientBtn.value === "off") {
        gradientBtn.value = "on";
        rainbowBtn.value = "off";
        colorDropperBtn.value = "off";
        gradientBtn.style.backgroundColor = "rgb(227, 227, 227)";
        rainbowBtn.style.backgroundColor = "rgb(255, 255, 255)";
        colorDropperBtn.style.backgroundColor = "rgb(255, 255, 255)";
    } else if (gradientBtn.value === "on") {
        gradientBtn.value = "off";
        gradientBtn.style.backgroundColor = "rgb(255, 255, 255)";
    }
});

colorDropperBtn.addEventListener("click", function(e) {
    if (colorDropperBtn.value === "off") {
        colorDropperBtn.value = "on";
        rainbowBtn.value = "off";
        gradientBtn.value = "off";
        colorDropperBtn.style.backgroundColor = "rgb(227, 227, 227)";
        rainbowBtn.style.backgroundColor = "rgb(255, 255, 255)";
        gradientBtn.style.backgroundColor = "rgb(255, 255, 255)";
    } else if (colorDropperBtn.value === "on") {
        colorDropperBtn.value = "off";
        colorDropperBtn.style.backgroundColor = "rgb(255, 255, 255)";
    }
});