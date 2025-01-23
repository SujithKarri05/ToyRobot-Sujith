'use strict';

//variable declarations
let inputText;
const directions = ['north', 'east', 'south', 'west'];
let temp;

//object declaration & initialisation
const position = {
    posX: 0,
    posY: 0,
    direction: null,
    marker: function () {
        return `The marker is in ${this.posX} ${this.posY}, facing ${this.direction}`
    },
    forTable: [this.posX, this.posY, this.direction]
};

//table creation for display
function tableCreate() {
    const body = document.body,
        tbl = document.createElement('table');
    tbl.id = 'myTable';
    tbl.style.marginLeft = '400px';
    tbl.style.width = '300px';
    tbl.style.blockSize = '300px';
    // tbl.style.border = '1px solid black';
    for (let i = 0; i < 5; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 5; j++) {
            const td = tr.insertCell();
            if (position.posX - 1 == i && position.posY - 1 == j) {
                td.style.background = 'green';
            } else {
                td.style.backgroundColor = '#ffffff';
            }
            //  td.style.border = '1px solid black';

        }
    }
    body.appendChild(tbl);
}

//change marker position
const changePos = function (pos) {
    if (pos == 'north') {
        position.posX = Math.max(Number(position.posX) - 1, 0);
    } else if (pos == 'south') {
        position.posX = Math.min(Number(position.posX) + 1, 5);
    } else if (pos == 'east') {
        position.posY = Math.min(Number(position.posY) + 1, 5);
    } else if (pos == 'west') {
        position.posY = Math.max(Number(position.posY) - 1, 0);
    }
}

//change marker direction
const changeDir = function (dir) {
    temp = directions.indexOf(position.direction);
    if (dir == 'left') {
        position.direction = directions[(temp - 1 + 4) % 4];
    } else {
        position.direction = directions[(temp + 1 + 4) % 4];
    }
    //    console.log(position.marker());
}

//update cell colour
const bgColour = function (x, y, clr) {
    var updateCell = document.getElementById('myTable');
    updateCell.rows[x - 1].cells[y - 1].style.backgroundColor = clr;
}

// Get the input
document.querySelector('.button').addEventListener('click', function () {
    let userInput = document.querySelector('.entry').value.toLowerCase();
    let lowerCaseInput = userInput.slice(0, 5);

    switch (lowerCaseInput) {
        case 'move':
            bgColour(position.posX, position.posY, 'White');
            changePos(position.direction);
            bgColour(position.posX, position.posY, 'Green');
            break;
        case 'left':
            bgColour(position.posX, position.posY, 'White');
            changeDir('left');
            bgColour(position.posX, position.posY, 'Green');
            break;
        case 'right':
            bgColour(position.posX, position.posY, 'White');
            changeDir('right');
            bgColour(position.posX, position.posY, 'Green');
            break;
        case 'report':
            bgColour(position.posX, position.posY, 'Red');
            break;
        case 'place':
            temp = userInput.slice(5, userInput.length);
            inputText = temp.split(',');
            position.posX = inputText[0];
            position.posY = inputText[1];
            position.direction = inputText[2];
            //    console.log(position.marker());
            tableCreate();
            break;
    }

    document.querySelector('.message').textContent = position.marker();
});