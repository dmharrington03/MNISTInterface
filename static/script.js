let w = 28;
let h = 28;
let size;
let diameter = 0;
let pixelState = [];

function setup() {
    let cnv = createCanvas(600, 600);
    cnv.parent("canvas-holder")
    size = width / w;
    textSize(20);
    stroke(100);
    // Populate pixel array
    reset_pixels();
}

function draw() {

    // Spacebar
    if (keyIsDown(32)) {
        reset_pixels();
        document.getElementById("result").innerHTML = "<p>?</p>";
    }
    
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {

            if (mouseIsPressed)
                set_fill(x, y, diameter);

            if (pixelState[x][y] === 1)
                fill(51);
            else
                fill(200);

            rect(x * size, y * size, size, size);
        }
    }

    fill(0);
    text(`Diameter: ${diameter + 1}`, 20, 30);
}

function keyPressed() {

    if (keyCode === DOWN_ARROW && diameter > 0)
        diameter--;
    else if (keyCode === UP_ARROW && diameter < 10)
        diameter++;
    
    if (keyCode === ENTER)
        send_data();
}

function set_fill(x, y, d) {
    if ((mouseX > x * size && mouseX < x * size + size)
    && (mouseY > y * size && mouseY < y * size + size)) {

        if (d % 2 === 0)
            for (let i = ceil(-d / 2); i <= floor(d / 2); i++)
                for (let j = ceil(-d / 2); j <= floor(d / 2); j++)
                        pixelState[constrain(x + i, 0, w - 1)][constrain(y + j, 0, h - 1)] = 1;
        else
            for (let i = ceil(-d / 2); i <= ceil(d / 2); i++)
                for (let j = ceil(-d / 2); j <= ceil(d / 2); j++)
                    pixelState[constrain(x + i, 0, w - 1)][constrain(y + j, 0, h - 1)] = 1;

    }
}

function reset_pixels() {
    pixelState = [];
    let row;
    for (let i = 0; i < w; i++) {
        row = [];
        for (let j = 0; j < h; j++) {
            row.push(0);
        }
        pixelState.push(row);
    }
}

function send_data() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = this.responseText.split(" ");
            document.getElementById("result").innerHTML = `<p>${res[0]} - ${Math.trunc(res[1] * 100 * 10) / 10}%</p>`;
        }
    };

    let data_string = JSON.stringify(pixelState.toString());
    xhttp.open("POST", "/submit", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(data_string);
}