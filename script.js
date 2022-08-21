const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 800;

const BLOCK_W = canvas.width / 10;
const BLOCK_H = canvas.height / 20;

const FPS = 30;

// window.addEventListener("resize", (e) => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

class Tetris {
  constructor() {
    this.width = BLOCK_W;
    this.height = BLOCK_H;
    this.lShape = [
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: this.width, y: this.height * 2 },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
        { x: 0, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width, y: this.height },
        { x: this.width, y: this.width * 2 },
      ],
      [
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
        { x: this.width * 2, y: this.height },
        { x: this.width * 2, y: 0 },
      ],
    ];
    this.iShape = [
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
        { x: this.width * 3, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: 0, y: this.height * 3 },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
        { x: this.width * 3, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: 0, y: this.height * 3 },
      ],
    ];
    this.tShape = [
      [
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
        { x: this.width * 2, y: this.height },
        { x: this.width, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: this.width, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
        { x: this.width, y: this.width },
      ],
      [
        { x: 0, y: this.width },
        { x: this.width, y: this.width },
        { x: this.width, y: 0 },
        { x: this.width, y: this.height * 2 },
      ],
    ];
    this.sShape = [
      [
        { x: 0, y: this.height },
        { x: this.height, y: this.height },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
        { x: this.width, y: this.height * 2 },
      ],
      [
        { x: 0, y: this.height },
        { x: this.height, y: this.height },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
        { x: this.width, y: this.height * 2 },
      ],
    ];
    this.zShape = [
      [
        { x: 0, y: 0 },
        { x: this.height, y: 0 },
        { x: this.width, y: this.height },
        { x: this.width * 2, y: this.height },
      ],
      [
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: this.width, y: this.height },
        { x: this.width, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: this.height, y: 0 },
        { x: this.width, y: this.height },
        { x: this.width * 2, y: this.height },
      ],
      [
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: this.width, y: this.height },
        { x: this.width, y: 0 },
      ],
    ];
    this.jShape = [
      [
        { x: this.width, y: 0 },
        { x: this.width, y: this.height },
        { x: this.width, y: this.height * 2 },
        { x: 0, y: this.height * 2 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
        { x: this.width * 2, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: this.height },
        { x: 0, y: this.height * 2 },
        { x: this.width, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: this.width * 2, y: 0 },
        { x: this.width * 2, y: this.height },
      ],
    ];
    this.oShape = [
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
      ],
      [
        { x: 0, y: 0 },
        { x: this.width, y: 0 },
        { x: 0, y: this.height },
        { x: this.width, y: this.height },
      ],
    ];
    this.AllShapes = [
      this.lShape,
      this.iShape,
      this.tShape,
      this.sShape,
      this.zShape,
      this.jShape,
      this.oShape,
    ];
  }
}
let key = "";
let Tetris_Game = new Tetris();
let random_shape = Math.floor(Math.random() * Tetris_Game.AllShapes.length);
let currentRotation = 0;

let currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
let currentShape = JSON.parse(JSON.stringify(currentChoice));
let takenShapes = [];

function draw() {
  currentShape.forEach((object) => {
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.fillStyle = "blue";
    ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
    ctx.fill();
    ctx.stroke();
  });

  if (takenShapes.length > 0) {
    takenShapes.forEach((shape) => {
      shape.forEach((object) => {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 4;
        ctx.fillStyle = "red";
        ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
        ctx.fill();
        ctx.stroke();
      });
    });
  }
}

function No_Crash() {
  if (takenShapes.length > 0) {
    let boolArray = [];
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((block) => {
          if (taken_block.y === block.y + BLOCK_H) {
            boolArray.push(false);
          } else {
            boolArray.push(true);
          }
        });
      });
    });
    if (boolArray.includes(false)) {
      return false;
    } else if (!boolArray.includes(false)) {
      return true;
    }
  } else {
    return true;
  }
}

function DownFall() {
  if (
    !currentShape.some((object) => object.y + BLOCK_H === canvas.height) &&
    No_Crash()
  ) {
    currentShape.forEach((object) => {
      object.y += BLOCK_H;
    });
  } else if (
    currentShape.some((object) => object.y + BLOCK_H === canvas.height) ||
    !No_Crash()
  ) {
    takenShapes.push(currentShape);

    random_shape = Math.floor(Math.random() * Tetris_Game.AllShapes.length);
    currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
    currentShape = JSON.parse(JSON.stringify(currentChoice));
  }
}

function GameLoop() {
  ctx.beginPath();
  ctx.clearRect(0, 0, 400, 800);
  draw();
  DownFall();
}

let interval = setInterval(GameLoop, 1000 / FPS);

window.addEventListener("keydown", (e) => {
  key = e.key;
  ctx.beginPath();
  ctx.clearRect(0, 0, 400, 800);
  if (key === "ArrowRight" || key === "d") {
    if (!currentShape.some((object) => object.x + BLOCK_W >= canvas.width)) {
      currentShape.forEach((object) => {
        object.x += BLOCK_W;
      });
    }
  } else if (key === "ArrowLeft" || key === "a") {
    if (!currentShape.some((object) => object.x - BLOCK_W < 0)) {
      currentShape.forEach((object) => {
        object.x -= BLOCK_W;
      });
    }
  } else if (key === "ArrowDown" || key === "s") {
    if (!currentShape.some((object) => object.y + BLOCK_H === canvas.height)) {
      currentShape.forEach((object) => {
        object.y += BLOCK_H;
      });
    }
  }
  draw();
});
