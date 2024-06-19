window.onload = function () {
    var canvas = document.getElementById('clockCanvas');
    var ctx = canvas.getContext('2d');
    var radius = canvas.width / 2;
    ctx.translate(radius, radius);
    var backgroundColorIndex = 0;
    var colors = ['black', 'red', 'green', 'blue'];
    var pointerColorIndex = 1;
    var secondCounter = 0;
    function drawClock() {
        drawFace(ctx, radius);
        drawTime(ctx, radius);
    }
    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colors[backgroundColorIndex];
        ctx.fill();
    }
    function drawTime(ctx, radius) {
        var secondPos = (secondCounter * Math.PI / 30);
        drawHand(ctx, secondPos, radius * 0.9, radius * 0.02, colors[pointerColorIndex]);
    }
    function drawHand(ctx, pos, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
    function updateClock() {
        ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
        drawClock();
        secondCounter = (secondCounter + 1) % 60;
        if (secondCounter === 0) {
            backgroundColorIndex++;
            pointerColorIndex++;
        }
    }
    setInterval(updateClock, 1000);
    drawClock();
};
