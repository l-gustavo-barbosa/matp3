window.onload = function() {
    const canvas = document.getElementById('clockCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')as CanvasRenderingContext2D;
    const radius = canvas.width / 2;
    ctx.translate(radius, radius);

    let backgroundColorIndex = 0;
    
    const colors = ['black', 'red', 'green', 'blue'];
    let pointerColorIndex = (backgroundColorIndex + 1) > colors.length - 1 ? 0 : backgroundColorIndex + 1;
    let secondCounter = 0;
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
        let secondPos = (secondCounter * Math.PI / 30);
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
            backgroundColorIndex = (backgroundColorIndex + 1) % colors.length;
            pointerColorIndex = (pointerColorIndex + 1) % colors.length
        }
    }

    setInterval(updateClock, 1000);
    drawClock();
}
