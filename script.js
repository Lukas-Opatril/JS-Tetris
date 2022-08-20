const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 10;

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Tetris {
  constructor() {
    this.width = 30;
    this.height = 30;
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
  }
}

let Tetris_Game = new Tetris();

function GameLoop() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  Tetris_Game.oShape[0].forEach((object) => {
    ctx.beginPath();
    ctx.rect(object.x, object.y, Tetris_Game.width, Tetris_Game.height);
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 5;
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  });
}

let interval = setInterval(GameLoop, 1000 / FPS);
