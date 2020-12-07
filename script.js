const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 620;

let snowBgCanvas;
let branchCanvas;

function initializeCanvas(canvasID) {
    const canvas = document.getElementById(canvasID);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas;
}

function main() {
    snowBgCanvas = initializeCanvas('canvasSnowBackground');
    branchCanvas = initializeCanvas('canvasTreeBranches');

    const snowflakeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5];
    drawBranches(snowBgCanvas, snowflakeLocation, 80, 0, 15, 'white');
    drawBranches(snowBgCanvas, snowflakeLocation, 80, 90, 15, 'white');
    drawBranches(snowBgCanvas, snowflakeLocation, 80, 180, 15, 'white');
    drawBranches(snowBgCanvas, snowflakeLocation, 80, 270, 15, 'white');

    const treeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.75];
    drawBranches(branchCanvas, treeLocation, 120, 0, 25, 'black');
}

function drawBranches(canvas, start, len, angle, branchWidth, strokeColor) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    // They do this so that the context's state
    // is preserved, which enables subsequent recursive
    // calls to be based off of this state. Otherwise,
    // the translations done each call will mess up the
    // appearance of the final result. TODO: figure out
    // exactly what aspect of the state matters for
    // being persisted
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.strokeStyle = strokeColor;
    // change context's (x,y) position and then rotate
    ctx.translate(...start);
    ctx.rotate(angle * Math.PI/180);

    // start at (0,0), then draw upwards line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len > 5) {
        // start the new branches at tip of previous
        drawBranches(canvas, [0, -len], len * 0.7, 30, branchWidth * 0.7);
        drawBranches(canvas, [0, -len], len * 0.7, -60, branchWidth * 0.7);
    }
    ctx.restore();
}

