const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");


const xAxisLabel = "X";
const yAxisLabel = "Y";

let xAxisScale;
let yAxisScale;

function draw() {
    if (canvas.getContext) {
        ctx.fillStyle = "rgb(0,0,0)";

        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        xAxisScale = canvasWidth / 10;
        yAxisScale = canvasHeight / 10;


        let originX = canvasWidth / 2;
        let originY = canvasHeight / 2;


        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvasWidth, originY);
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvasHeight);
        ctx.stroke();


        ctx.font = '14px Arial';
        ctx.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 5);
        ctx.fillText(yAxisLabel, canvas.width / 2 + 5, 15);

        for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
            let scalePos = axesToCanvasCoordinates(i, 0, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x, scalePos.y - 5);
            ctx.lineTo(scalePos.x, scalePos.y + 5);
            ctx.stroke();
            ctx.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
        }

        for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
            let scalePos = axesToCanvasCoordinates(0, j, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x - 5, scalePos.y);
            ctx.lineTo(scalePos.x + 5, scalePos.y);
            ctx.stroke();
            ctx.fillText(rescaleYAxesCoordinate(j), scalePos.x + 10, scalePos.y + 5);
        }
    }
}

function axesToCanvasCoordinates(xAxes, yAxes, canvas) {

    let originX = canvas.width / 2;
    let originY = canvas.height / 2;


    let canvasX = originX + xAxes;
    let canvasY = originY - yAxes;

    return { x: canvasX, y: canvasY };
}

function rescaleXAxesCoordinate(coordinate) {
    return coordinate / xAxisScale;
}

function rescaleYAxesCoordinate(coordinate) {
    return coordinate / yAxisScale;
}

function scaleXAxesCoordinate(coordinate) {
    return coordinate * xAxisScale;
}

function scaleYAxesCoordinate(coordinate) {
    return coordinate * yAxisScale;
}

function drawShapesByR(r) {
    if (canvas.getContext) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();


        // draw rectangle
        let startPointInAxes = {x: 0, y: 0};
        let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);



        let endPointInAxes = {x: -r, y: r/4};
        let endScaledPointInAxes = {
            x: scaleXAxesCoordinate(endPointInAxes.x),
            y: scaleYAxesCoordinate(endPointInAxes.y)
        };
        ;


        ctx.fillStyle = "rgba(255,242,0,0.75)";

        ctx.beginPath();
        ctx.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);


        let secondTrianglePointInAxes = {x: -r, y: 0};
        let thirdTrianglePointInAxes = {x: 0, y: -r/2};
        ctx.fillStyle = "rgba(0,200,57,0.75)";
        drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);

        ctx.fillStyle = "rgba(104,55,206,0.5)";

        let calculatedRadius = scaleXAxesCoordinate(r / 2);
        let startAngle = 0; // Начальный угол 0 радиан (0 градусов)
        let endAngle = 3*Math.PI/2; // Конечный угол Pi/2 радиан (90 градусов)

        ctx.beginPath();
        ctx.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, startAngle, endAngle,true);
        ctx.fill();

        let secondTrianglePointInAxesM = {x: r / 2, y: 0};
        let thirdTrianglePointInAxesM = {x: 0, y: r / 2};
        drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxesM, thirdTrianglePointInAxesM);

    }
}

function drawTriangle (ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) {
    if (canvas.getContext) {
        let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
        let secondScaledTrianglePointInAxes = {
            x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
            y: scaleYAxesCoordinate(secondTrianglePointInAxes.y)
        }
        let thirdScaledTrianglePointInAxes = {
            x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
            y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y)
        };
        let secondTrianglePointInCanvas = axesToCanvasCoordinates
        (secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y, canvas);
        let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates
        (thirdScaledTrianglePointInAxes.x, thirdScaledTrianglePointInAxes.y, canvas);

        ctx.beginPath();
        ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
        ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
        ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
        ctx.fill();
    }
}

function drawPoint(x, y, r) {
    if (canvas.getContext) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        drawShapesByR(r);

        const pointSize = 4;

        let scaledPoint = {x: scaleXAxesCoordinate(x), y: scaleYAxesCoordinate(y)};
        let pointOnCanvas = axesToCanvasCoordinates(scaledPoint.x, scaledPoint.y, canvas);

        ctx.fillStyle = "rgb(200,0,0)";

        ctx.beginPath();
        ctx.fillRect(pointOnCanvas.x - pointSize / 2, pointOnCanvas.y - pointSize / 2, pointSize, pointSize);
    }
}

draw();
