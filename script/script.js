//draw a new grid with size * size
function drawGrid(size) {
  let container = document.querySelector(".container");
  container.ondragstart = () => {
    return false;
  };
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  container.style.cssText = `grid-template-rows: repeat(${size}, 1fr); grid-template-columns: repeat(${size}, 1fr)`;
  for (let index = 0; index < size ** 2; index++) {
    container.appendChild(document.createElement("div"));
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//reset the initial state of grid
function clear() {
  let gridItems = document.querySelectorAll(".container div");
  [...gridItems].forEach((item) => {
    item.style.backgroundColor = "#e6e8e6";
  });
}

//resize the size of the grid (cant go over 50x50)
function resize() {
  let newSize = parseInt(prompt("Please enter new size: "));
  if (!newSize) return;
  if (newSize > 50) newSize = 50;
  init(newSize);
}

/*-------------------------------------*/
let cursorState = {
  drawing: false,
  color: "black",
  eraser: false,
  isErasing: false,
  rainbow: false,
};
const container = document.querySelector(".container");
container.ondragstart = () => {
  return false;
};
window.addEventListener("mouseup", () => {
  cursorState.drawing = false;
  cursorState.isErasing = false;
});
const clearButton = document.querySelector(".clear");
const resizeButton = document.querySelector(".resize");
const eraserToggler = document.getElementById("eraser");
const eraserToggleContainer = document.querySelector(".eraser-toggle");
const colorPicker = document.getElementById("color-picker");
const colorDisplay = document.querySelector(".color-display");
const rainbowToggle = document.getElementById("rainbow");
eraserToggler.addEventListener("input", () => {
  cursorState.eraser = !cursorState.eraser;
  if (cursorState.eraser === true)
    eraserToggleContainer.classList.add("toggled");
  else eraserToggleContainer.classList.remove("toggled");
});
colorPicker.addEventListener("input", (e) => {
  cursorState.color = e.target.value;
  colorDisplay.style.backgroundColor = cursorState.color;
});
rainbowToggle.addEventListener("input", (e) => {
  cursorState.rainbow = !cursorState.rainbow;
  if (cursorState.rainbow === true)
    e.target.parentNode.classList.add("toggled");
  else e.target.parentNode.classList.remove("toggled");
});
clearButton.addEventListener("click", clear);
resizeButton.addEventListener("click", resize);

/*------------------------------------*/

//draw grid then assign event listener
function init(size) {
  drawGrid(size);
  let gridItems = document.querySelectorAll(".container > div");
  [...gridItems].forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      if (e.which !== 1) return;
      if (cursorState.eraser === true) {
        cursorState.isErasing = true;
        item.style.backgroundColor = "#e6e8e6";
        return;
      }
      cursorState.drawing = true;
      if (cursorState.rainbow) item.style.backgroundColor = getRandomColor();
      else item.style.backgroundColor = cursorState.color;
    });
    item.addEventListener("mouseover", () => {
      if (cursorState.eraser === true && cursorState.isErasing === true) {
        item.style.backgroundColor = "#e6e8e6";
      } else if (cursorState.drawing === true) {
        if (cursorState.rainbow) item.style.backgroundColor = getRandomColor();
        else item.style.backgroundColor = cursorState.color;
      }
    });
  });
}

init(20);
