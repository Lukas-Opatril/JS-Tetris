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
      "#FF971C",
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
      "cyan",
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
      "purple",
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
      "#72CB3B",
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
      "#FF3213",
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
      "#0341AE",
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
      "#FFD500",
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
let score = document.getElementById("score");
let points = 0;
let completedLines = 0;
let Tetris_Game = new Tetris();
let random_shape = Math.floor(Math.random() * Tetris_Game.AllShapes.length);
let currentRotation = 0;
let XMove_counter = 0;
let YMove_counter = 0;
let currentLetter = Tetris_Game.AllShapes[random_shape];
let currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
let currentShape = JSON.parse(JSON.stringify(currentChoice));
for (let i = 0; i < currentShape.length; i++) {
  currentShape[i].color = currentLetter[4];
}
let takenShapes = [];

function draw() {
  currentShape.forEach((object, index) => {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.fillStyle = object.color;
    ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
    ctx.fill();
    ctx.stroke();
  });

  if (takenShapes.length > 0) {
    takenShapes.forEach((shape) => {
      shape.forEach((object) => {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.fillStyle = object.color;
        ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
        ctx.fill();
        ctx.stroke();
      });
    });
  }
  RowControl();
}

function RowControl() {
  if (takenShapes.length > 0) {
    let rowCompleted = 0;
    for (let i = BLOCK_H; i <= canvas.height - BLOCK_H; i += BLOCK_H) {
      let counter = 0;

      takenShapes.forEach((shape) => {
        shape.forEach((taken_block) => {
          if (taken_block.y === i) {
            counter++;
          }
        });
      });
      if (counter === 10) {
        rowCompleted++;
        //console.log("Row compelted on index: " + i);
        takenShapes.forEach((shape) => {
          for (let j = 0; j < shape.length; j++) {
            if (shape[j].y === i) {
              shape.splice(j, 1);
              j = 0;
            }
          }
          for (let j = 0; j < shape.length; j++) {
            if (shape[j].y === i) {
              shape.splice(j, 1);
              j = 0;
            }
          }
        });

        takenShapes.forEach((shape) => {
          shape.forEach((taken_block) => {
            if (taken_block.y < i) {
              taken_block.y += BLOCK_H;
            }
          });
        });
      }
    }
    if (rowCompleted > 0) {
      points += rowCompleted * 10;
      score.innerText = points;
      completedLines += rowCompleted;
    }
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

function Game_Over_Check() {
  takenShapes.forEach((shape) => {
    shape.forEach((taken_block) => {
      currentShape.forEach((block) => {
        if (taken_block.y === block.y && taken_block.y === 0) {
          alert(
            "GAME OVER!\n Total number of completed lines : " + completedLines
          );
        }
      });
    });
  });
}

function Next_rotation_no_glitch(angle) {
  let rotation = angle;
  if (rotation === 4) {
    rotation = 0;
  }
  let rotatedChoice = Tetris_Game.AllShapes[random_shape][rotation];
  let rotatedShape = JSON.parse(JSON.stringify(rotatedChoice));

  rotatedShape.forEach((object) => {
    object.x += XMove_counter;
    object.y += YMove_counter;
  });

  let bool = undefined;
  let boolArray = [];
  if (takenShapes.length > 0) {
    takenShapes.forEach((shape) => {
      shape.forEach((taken_block) => {
        rotatedShape.forEach((object) => {
          if (taken_block.x === object.x && taken_block.y === object.y) {
            console.log("Collison!");
            boolArray.push(false);
          } else if (taken_block.x !== object.x && taken_block.y !== object.y) {
            boolArray.push(true);
          }
        });
      });
    });
  } else {
    bool = true;
    console.log(bool);
    return bool;
  }
  if (boolArray.some((value) => value === false)) {
    bool = false;
    console.log(bool);
    return bool;
  } else if (boolArray.every((value) => value === true)) {
    bool = true;
    console.log(bool);
    return bool;
  }
}

function takeShape() {
  takenShapes.push(currentShape);
  currentRotation = 0;
  XMove_counter = 0;
  YMove_counter = 0;
  random_shape = Math.floor(Math.random() * Tetris_Game.AllShapes.length);

  currentLetter = Tetris_Game.AllShapes[random_shape];
  currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
  currentShape = JSON.parse(JSON.stringify(currentChoice));
  for (let i = 0; i < currentShape.length; i++) {
    currentShape[i].color = currentLetter[4];
  }
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
    ShowLanding();
  } else if (
    currentShape.some((object) => object.y + BLOCK_H === canvas.height) ||
    !No_Crash_Down()
  ) {
    takeShape();
  }
  RowControl();
  ctx.globalAlpha = "1";
}

function ShowLanding() {
  ctx.globalAlpha = "0.3";
  if (takenShapes.length > 0) {
    let currentShape_Copy = JSON.parse(JSON.stringify(currentShape));

    while (Can_Drop(currentShape_Copy)) {
      currentShape_Copy.forEach((object) => {
        object.y += BLOCK_H;
      });
    }
    currentShape_Copy.forEach((coordinates) => {
      ctx.beginPath();
      ctx.strokeStyle = coordinates.color;
      ctx.lineWidth = 2;
      ctx.fillStyle = coordinates.color;
      ctx.rect(
        coordinates.x,
        coordinates.y,
        Tetris_Game.width,
        Tetris_Game.height
      );
      ctx.fill();
      ctx.stroke();
    });
  } else {
    let currentShape_Copy = JSON.parse(JSON.stringify(currentShape));

    while (Can_Drop_No_Taken(currentShape_Copy)) {
      currentShape_Copy.forEach((object) => {
        object.y += BLOCK_H;
      });
    }
    currentShape_Copy.forEach((coordinates) => {
      ctx.beginPath();
      ctx.strokeStyle = coordinates.color;
      ctx.lineWidth = 2;
      ctx.fillStyle = coordinates.color;
      ctx.rect(
        coordinates.x,
        coordinates.y,
        Tetris_Game.width,
        Tetris_Game.height
      );
      ctx.fill();
      ctx.stroke();
    });
  }
}

function GameLoop() {
  ctx.beginPath();
  ctx.clearRect(0, 0, 400, 800);
  ShowLanding();
  ctx.globalAlpha = "1";
  draw();
  Game_Over_Check();

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
function Can_Drop(currentShape) {
  let boolArray = [];
  currentShape.forEach((object) => {
    takenShapes.forEach((shapes) => {
      shapes.forEach((taken_block) => {
        if (
          (taken_block.y === object.y + BLOCK_H &&
            taken_block.x === object.x) ||
          object.y === canvas.height - BLOCK_H
        ) {
          boolArray.push(false);
        } else if (
          (taken_block.y !== object.y + BLOCK_H &&
            taken_block.x !== object.x) ||
          object.y !== canvas.height - BLOCK_H
        ) {
          boolArray.push(true);
        }
      });
    });
  });
  if (boolArray.some((value) => value === false)) {
    return false;
  } else if (boolArray.every((value) => value === true)) {
    return true;
  }
}
function Can_Drop_No_Taken(currentShape) {
  let boolArray = [];
  currentShape.forEach((object) => {
    if (object.y === canvas.height - BLOCK_H) {
      boolArray.push(false);
    } else {
      boolArray.push(true);
    }
  });

  if (boolArray.some((value) => value === false)) {
    return false;
  } else if (boolArray.every((value) => value === true)) {
    return true;
  }
}

function InstantDrop() {
  if (takenShapes.length > 0) {
    while (Can_Drop(currentShape)) {
      currentShape.forEach((coordinates) => {
        coordinates.y += BLOCK_H;
      });
    }
  } else {
    while (
      !currentShape.some((object) => object.y === canvas.height - BLOCK_H)
    ) {
      currentShape.forEach((coordinates) => {
        coordinates.y += BLOCK_H;
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
    ShowLanding();
    ctx.globalAlpha = "1";
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
    ShowLanding();
    ctx.globalAlpha = "1";
  } else if (key === "ArrowDown" || key === "s") {
    DownFall();
  } else if (key === "ArrowUp" || key === "z") {
    if (Next_rotation_no_glitch(currentRotation + 1)) {
      currentRotation++;
      if (currentRotation === 4) {
        currentRotation = 0;
      }
      currentChoice = Tetris_Game.AllShapes[random_shape][currentRotation];
      currentShape = JSON.parse(JSON.stringify(currentChoice));
      for (let i = 0; i < currentShape.length; i++) {
        currentShape[i].color = currentLetter[4];
      }
      RotationCorrect();
      ShowLanding();
      ctx.globalAlpha = "1";
    }
  } else if (key === " ") {
    InstantDrop();
    GameLoop();
  }
  draw();
});
