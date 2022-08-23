const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 800;

const BLOCK_W = canvas.width / 10;
const BLOCK_H = canvas.height / 20;

const FPS = 1;

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
let XMove_counter = 0;
let YMove_counter = 0;

let currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
let currentShape = JSON.parse(JSON.stringify(currentChoice));
// currentShape.forEach(object => {
//   object.x+=BLOCK_W*4

// })
let takenShapes = [];

function draw() {
  // console.clear()
  currentShape.forEach((object) => {
    //console.log(object.x + " " + object.y);
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
        ctx.fillStyle = "blue";
        ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
        ctx.fill();
        ctx.stroke();
      });
    });
  }
}

function No_Crash_Down() {
  if (takenShapes.length > 0) {
    let boolArray = [];
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((block) => {
          if (
            taken_block.y === block.y + BLOCK_H &&
            taken_block.x === block.x
          ) {
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
function No_Crash_Up() {
  if (takenShapes.length > 0) {
    let boolArray = [];
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((block) => {
          if (
            taken_block.y === block.y - BLOCK_H &&
            taken_block.x === block.x
          ) {
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

function No_Crash_Left() {
  if (takenShapes.length > 0) {
    let boolArray = [];
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((block) => {
          if (
            taken_block.y === block.y &&
            taken_block.x === block.x - BLOCK_W
          ) {
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
function No_Crash_Right() {
  if (takenShapes.length > 0) {
    let boolArray = [];
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((block) => {
          if (
            taken_block.y === block.y &&
            taken_block.x === block.x + BLOCK_W
          ) {
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

function Next_rotation_no_glitch(rotation) {
  if (rotation === 4) {
    rotation = 0;
  }
  let currentChoice = Tetris_Game.AllShapes[random_shape][rotation];
  let currentShape = JSON.parse(JSON.stringify(currentChoice));
  let bool = undefined;
  let boolArray = [];
  if (takenShapes.length > 0) {
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        currentShape.forEach((object) => {
          if (taken_block.x === object.x && taken_block.y === object.y) {
            boolArray.push(false);
          } else {
            boolArray.push(true);
          }
        });
      });
    });
  } else {
    bool = true;
    return bool;
  }
  if (boolArray.some((bool) => bool === false)) {
    bool = false;
  } else {
    bool = true;
  }

  return bool;
}

function takeShape() {
  takenShapes.push(currentShape);
  currentRotation = 0;
  XMove_counter = 0;
  YMove_counter = 0;
  random_shape = Math.floor(Math.random() * Tetris_Game.AllShapes.length);
  currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
  currentShape = JSON.parse(JSON.stringify(currentChoice));
}

function DownFall() {
  if (
    !currentShape.some((object) => object.y + BLOCK_H === canvas.height) &&
    No_Crash_Down()
  ) {
    YMove_counter += BLOCK_H;
    currentShape.forEach((object) => {
      object.y += BLOCK_H;
    });
  } else if (
    currentShape.some((object) => object.y + BLOCK_H === canvas.height) ||
    !No_Crash_Down()
  ) {
    takeShape();
  }
}

function GameLoop() {
  ctx.beginPath();
  ctx.clearRect(0, 0, 400, 800);
  draw();
  DownFall();
}

let interval = setInterval(GameLoop, 1000 / FPS);

function RotationCorrect() {
  currentShape.forEach((object) => {
    object.x += XMove_counter;
    object.y += YMove_counter;
  });

  if (currentShape.some((object) => object.x >= canvas.width)) {
    while (currentShape.some((object) => object.x >= canvas.width)) {
      currentShape.forEach((object) => {
        object.x -= BLOCK_W;
      });
    }
  } else if (currentShape.some((object) => object.x < 0)) {
    while (currentShape.some((object) => object.x < 0)) {
      currentShape.forEach((object) => {
        object.x += BLOCK_W;
      });
    }
  }
  if (currentShape.some((object) => object.y >= canvas.height)) {
    while (currentShape.some((object) => object.y >= canvas.height)) {
      currentShape.forEach((object) => {
        object.y -= BLOCK_H;
      });
    }
  }
}

window.addEventListener("keyup", (e) => {
  key = e.key;
  ctx.beginPath();
  ctx.clearRect(0, 0, 400, 800);
  if (key === "ArrowRight" || key === "d") {
    if (!currentShape.some((object) => object.x + BLOCK_W >= canvas.width)) {
      if (No_Crash_Right()) {
        XMove_counter += BLOCK_W;
        currentShape.forEach((object) => {
          object.x += BLOCK_W;
        });
      } else {
        takeShape();
      }
    }
  } else if (key === "ArrowLeft" || key === "a") {
    if (!currentShape.some((object) => object.x - BLOCK_W < 0)) {
      if (No_Crash_Left()) {
        XMove_counter -= BLOCK_W;
        currentShape.forEach((object) => {
          object.x -= BLOCK_W;
        });
      } else {
        takeShape();
      }
    }
  } else if (key === "ArrowDown" || key === "s") {
    DownFall();
  } else if (key === "ArrowUp" || key === "z") {
    if (Next_rotation_no_glitch(currentRotation + 1)) {
      currentRotation++;
      console.log(Next_rotation_no_glitch(currentRotation));
      if (currentRotation === 4) {
        currentRotation = 0;
      }
      currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
      currentShape = JSON.parse(JSON.stringify(currentChoice));
      RotationCorrect();
    }
  }
  draw();
});
