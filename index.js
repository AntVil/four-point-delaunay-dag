const RESOLUTION = 800;
const TRIANGLE_HEIGHT = 0.5;
const TRIANGLE_CENTER_X = 0.5;
const TRIANGLE_CENTER_Y = 0.5;
const TRIANGLE_EDGE_LENGTH = TRIANGLE_HEIGHT / Math.sin(Math.PI / 3);
const TRIANGLE_RADIUS = (TRIANGLE_EDGE_LENGTH / 2) / Math.cos(Math.PI / 6);

const CASE_UNDEFINED = 0b0000;
const CASE_RIGHT = 0b1000;
const CASE_BOTTOM = 0b0100;
const CASE_LEFT = 0b0010;
const CASE_RIGHT_FLIP = 0b1001;
const CASE_BOTTOM_FLIP = 0b0101;
const CASE_LEFT_FLIP = 0b0011;
const CASE_DIAGONAL_RIGHT_BOTTOM = 0b1100;
const CASE_DIAGONAL_BOTTOM_LEFT = 0b0110;
const CASE_DIAGONAL_LEFT_RIGHT = 0b1010;
const CASE_INSIDE = 0b0001;

const triangle = [
    // top
    [TRIANGLE_CENTER_X, TRIANGLE_CENTER_Y - TRIANGLE_RADIUS],
    // right
    [TRIANGLE_CENTER_X + TRIANGLE_EDGE_LENGTH / 2, TRIANGLE_CENTER_Y + TRIANGLE_RADIUS / 2],
    //left
    [TRIANGLE_CENTER_X - TRIANGLE_EDGE_LENGTH / 2, TRIANGLE_CENTER_Y + TRIANGLE_RADIUS / 2],
];

let mouseX = NaN;
let mouseY = NaN;

let input;
let output;
let inputCtxt;
let outputCtxt;

window.onload = () => {
    input = document.getElementById("input");
    output = document.getElementById("output");
    input.width = RESOLUTION;
    input.height = RESOLUTION;
    output.width = RESOLUTION;
    output.height = RESOLUTION;

    inputCtxt = input.getContext("2d");
    outputCtxt = output.getContext("2d");

    input.addEventListener("mousemove", (e) => {
        let rect = input.getBoundingClientRect();
        mouseX = e.offsetX / rect.width;
        mouseY = e.offsetY / rect.height;
    });

    input.addEventListener("mouseleave", (e) => {
        mouseX = NaN;
        mouseY = NaN;
    })

    loop();
}

function loop() {
    inputCtxt.clearRect(0, 0, input.width, input.height);
    inputCtxt.save();
    inputCtxt.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0);
    inputCtxt.lineWidth = 0.01;

    outputCtxt.clearRect(0, 0, input.width, input.height);
    outputCtxt.save();
    outputCtxt.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0);
    outputCtxt.lineWidth = 0.01;

    inputCtxt.strokeStyle = "#222";
    inputCtxt.beginPath();
    inputCtxt.arc(TRIANGLE_CENTER_X, TRIANGLE_CENTER_Y, TRIANGLE_RADIUS, 0, 2 * Math.PI);
    inputCtxt.stroke();

    let combination = computeCombination();

    inputCtxt.strokeStyle = "#000";

    outputCtxt.fillStyle = "#FFF";
    outputCtxt.font = "0.03px Arial";
    outputCtxt.textAlign = "center";
    outputCtxt.textBaseline = "middle";
    outputCtxt.beginPath();
    for(let i=1;i<=4;i++) {
        outputCtxt.moveTo(0.5, 0.25);
        outputCtxt.lineTo(i/5, 0.45);
    }
    outputCtxt.stroke();

    outputCtxt.fillText("123", 0.2, 0.5);
    outputCtxt.fillText("12", 0.4, 0.5);
    outputCtxt.fillText("13", 0.6, 0.5);
    outputCtxt.fillText("23", 0.8, 0.5);

    switch (combination) {
    case CASE_UNDEFINED:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();
        break;
    case CASE_RIGHT:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("14", 0.4, 0.75);
        outputCtxt.fillText("24", 0.6, 0.75);
        break;
    case CASE_BOTTOM:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("234", 0.2, 0.75);
        outputCtxt.fillText("24", 0.4, 0.75);
        outputCtxt.fillText("34", 0.6, 0.75);
        break;
    case CASE_LEFT:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("134", 0.2, 0.75);
        outputCtxt.fillText("14", 0.4, 0.75);
        outputCtxt.fillText("34", 0.6, 0.75);
        break;
    case CASE_RIGHT_FLIP:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();

        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("134", 0.2, 0.75);
        outputCtxt.fillText("234", 0.4, 0.75);
        outputCtxt.fillText("14", 0.6, 0.75);
        outputCtxt.fillText("24", 0.8, 0.75);
        break;
    case CASE_BOTTOM_FLIP:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();

        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("134", 0.4, 0.75);
        outputCtxt.fillText("24", 0.6, 0.75);
        outputCtxt.fillText("34", 0.8, 0.75);
        break;
    case CASE_LEFT_FLIP:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();

        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("134", 0.4, 0.75);
        outputCtxt.fillText("14", 0.6, 0.75);
        outputCtxt.fillText("34", 0.8, 0.75);
        break;
    case CASE_DIAGONAL_RIGHT_BOTTOM:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("234", 0.4, 0.75);
        outputCtxt.fillText("14", 0.6, 0.75);
        outputCtxt.fillText("34", 0.8, 0.75);
        break;
    case CASE_DIAGONAL_BOTTOM_LEFT:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("134", 0.2, 0.75);
        outputCtxt.fillText("234", 0.4, 0.75);
        outputCtxt.fillText("14", 0.6, 0.75);
        outputCtxt.fillText("24", 0.8, 0.75);
        break;
    case CASE_DIAGONAL_LEFT_RIGHT:
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[2][0], triangle[2][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(mouseX, mouseY);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.8, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("134", 0.4, 0.75);
        outputCtxt.fillText("24", 0.6, 0.75);
        outputCtxt.fillText("34", 0.8, 0.75);
        break;
    case CASE_INSIDE:
        inputCtxt.beginPath();
        inputCtxt.moveTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.moveTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.moveTo(mouseX, mouseY);
        inputCtxt.lineTo(triangle[0][0], triangle[0][1]);
        inputCtxt.stroke();
        inputCtxt.beginPath();
        inputCtxt.moveTo(triangle[0][0], triangle[0][1]);
        inputCtxt.lineTo(triangle[1][0], triangle[1][1]);
        inputCtxt.lineTo(triangle[2][0], triangle[2][1]);
        inputCtxt.closePath();
        inputCtxt.stroke();

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.2, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.stroke();

        outputCtxt.setLineDash([0.01, 0.01]);

        outputCtxt.beginPath();
        outputCtxt.moveTo(0.4, 0.55);
        outputCtxt.lineTo(0.2, 0.7);
        outputCtxt.moveTo(0.6, 0.55);
        outputCtxt.lineTo(0.4, 0.7);
        outputCtxt.moveTo(0.8, 0.55);
        outputCtxt.lineTo(0.6, 0.7);
        outputCtxt.stroke();

        outputCtxt.fillText("124", 0.2, 0.75);
        outputCtxt.fillText("124", 0.4, 0.75);
        outputCtxt.fillText("234", 0.6, 0.75);
        break;
    default:
        console.error(`unknown combination: ${combination}`)
    }

    inputCtxt.beginPath();
    inputCtxt.arc(mouseX, mouseY, 0.005, 0, 2 * Math.PI);
    inputCtxt.stroke();

    inputCtxt.fillStyle = "#FFF";
    inputCtxt.font = "0.03px Arial";
    inputCtxt.textAlign = "center";
    inputCtxt.textBaseline = "middle";
    inputCtxt.fillText("1", triangle[0][0], triangle[0][1] - 0.01);
    inputCtxt.fillText("2", triangle[1][0], triangle[1][1] - 0.01);
    inputCtxt.fillText("3", triangle[2][0], triangle[2][1] - 0.01);
    inputCtxt.fillText("4", mouseX, mouseY - 0.01);

    inputCtxt.restore();
    outputCtxt.restore();

    requestAnimationFrame(loop);
}

function computeCombination() {
    let isRight = computeSide(triangle[0][0], triangle[0][1], triangle[1][0], triangle[1][1], mouseX, mouseY);
    let isBottom = computeSide(triangle[1][0], triangle[1][1], triangle[2][0], triangle[2][1], mouseX, mouseY);
    let isLeft = computeSide(triangle[2][0], triangle[2][1], triangle[0][0], triangle[0][1], mouseX, mouseY);
    let isInsideCircle = Math.hypot(mouseX - TRIANGLE_CENTER_X, mouseY - TRIANGLE_CENTER_Y) < TRIANGLE_RADIUS;

    return (
        0b1000 * isRight +
        0b100 * isBottom +
        0b10 * isLeft +
        0b1 * isInsideCircle
    )
}

function computeSide(x1, y1, x2, y2, x3, y3) {
    const signedTriangleArea = (x3-x1)*(y3+y1) + (x2-x3)*(y2+y3) + (x1-x2)*(y1+y2);
    return signedTriangleArea < 0;
}
