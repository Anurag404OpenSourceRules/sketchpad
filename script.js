// SketchPad
const canvas = document.createElement('canvas'),
      div = document.getElementById("sketchpad-id");
canvas.id = "drawing";

canvas.width  = div.clientWidth;
canvas.height = div.clientHeight;
canvas.style.border   = "2px solid rgba(255, 255, 255, 0.845)";
div.appendChild(canvas);

const context = canvas.getContext("2d");
context.fillStyle = "#121212";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = "#F10835";
context.lineCap = "butt";
context.lineWidth = 2;

let isDrawing = false;
let path = []; // Better to use Path2D. To store and manipulate path
let allPaths = [];
let mouse = [];


function startDrawing() {
    isDrawing = true;
    path = [mouse];
    context.beginPath();
}

function endDrawing() {
    isDrawing = false;
    allPaths.push(path);
    console.log(`endDrawing ${isDrawing}`);
}

function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();

    mouse = [
        Math.round(event.clientX - rect.left),
        Math.round(event.clientY - rect.top)
    ]
}

function changeColor(color) {
    context.strokeStyle = color;
}

function draw(event) {
    if(isDrawing != true) {
        return;
    }

    getMousePosition(event);
    console.log(mouse);
    path.push(mouse);

    if(context.strokeStyle == "#121212") {
	    context.lineWidth = 5;
    }else {
	    context.lineWidth = 2;
    }

    context.lineTo(mouse[0], mouse[1]);
    context.stroke();

    context.beginPath();
    context.moveTo(mouse[0], mouse[1]);
}

// Event Listners
// canvas.addEventListener("onclick", startDrawing);;
canvas.onmousedown = startDrawing;
canvas.onmouseup = endDrawing;
canvas.onmousemove = draw;
canvas.onmouseleave = endDrawing;



// Toolbox
const colors = Array.from(document.getElementById("color-pallet").children);


function getColor(element) {
    return window.getComputedStyle(element, null).getPropertyValue("background-color");
}


colors.forEach((color) => {
    color.onclick = () => {
        changeColor(getColor(color));
    }
});
