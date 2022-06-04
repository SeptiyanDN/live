const CANVAS = document.createElement("canvas");
const CTX = CANVAS.getContext("2d");

let imgSrc = "https://assets.codepen.io/981242/super-star.png?width=300&height=286&format=auto";
let img = new Image();
let imgRatio;
let animating = false;
let numParticles = window.innerWidth * 0.2 > 100 ? 100 : Math.round(window.innerWidth * 0.2);
let particles = [];
let resizeTimer;
let debug = false;

const setCanvasSize = () => {
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
};

const update = delta => {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  particles.forEach(p => {
    p.update(delta);
    p.draw();
  })
}

const render = delta => {
  if (!delta) delta = 0;
  update(delta);
  if (animating) requestAnimationFrame(render);
}

const createParticles = () => {
  particles = [];
  let i = 0;
  for (i; i < numParticles; i++) {
    const x = Math.random() * CANVAS.width;
    const y = -Math.random() * CANVAS.height - (Math.random() * (300 - 50) + 50);
    const size = Math.random() * (50 - 15) + 15;
    particles.push(new Particle(x, y, size, CTX));
  }
}

const onResize = () => {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    numParticles = window.innerWidth * 0.2 > 100 ? 100 : Math.round(window.innerWidth * 0.2);
    setCanvasSize();
    createParticles();
  }, 100);
};

const addEventListeners = () => {
  window.addEventListener("resize", onResize);
};

const removeEventListeners = () => {
  window.removeEventListener("resize", onResize);
}

const loadImage = () => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      reject(new Error("could not load image"));
    }, 5000);
    img.addEventListener("load", () => {
      clearTimeout(timer);
      resolve(true);
    }, { once: true });
    img.src = imgSrc;
  })
}

const play = () => {
  animating = true;
}

const pause = () => {
  animating = false;
}

const init = async () => {
  setCanvasSize();
  document.body.appendChild(CANVAS);
  
  try {
    await loadImage();
    imgRatio = Math.round(img.naturalHeight / img.naturalWidth);
    createParticles();
    addEventListeners();
    play();
    render();
  } catch(err) {
    console.error(err);
    destroy();
  }
};

const destroy = () => {
  removeEventListeners();
  document.body.removeChild(CANVAS);
}

init();







//---------------------------------------

class Particle {
  constructor(x, y, size, stageCtx) {
    this.startY = y;
    this.pos = { x, y };
    this.canvSize = 100;
    this.size = Math.hypot(size, size) > this.canvSize ? 70 : size;
    this.angle = Math.random() * (Math.PI * 2);
    this.velocity = {
      x: parseFloat(Math.random().toFixed(1)),
      y: parseFloat((Math.random() * (10 - 9) + 0).toFixed(0)),
    };
    this.stage = stageCtx;
    
    this.c = document.createElement("canvas");
    this.ctx = this.c.getContext("2d");
    this.c.width = this.canvSize;
    this.c.height = this.canvSize;
    this.freqFactor = (Math.random() * (15 - 5) + 5) * .00008;
    this.ampFactor = (Math.random() * (10 + 5) - 5) * .1;
    
    this.minAngleIncr = Math.PI / 200;
    this.maxAngleIncr = Math.PI / 300;
    this.angleIncr = Math.random() * (this.maxAngleIncr - this.minAngleIncr) + this.minAngleIncr;
    this.angleIncr = Math.random() > 0.5 ? this.angleIncr : -this.angleIncr;
  }
  
  update(delta) {
    if (this.pos.y > this.stage.canvas.height + this.canvSize) {
      this.pos.y = this.startY;
    } else {
      this.pos.y += this.velocity.y;
    }
    
    this.pos.x += Math.sin(delta * this.freqFactor) * this.ampFactor;
    this.angle += this.angleIncr;
  }
  
  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctx.translate(this.c.width * 0.5, this.c.height * 0.5);
    this.ctx.rotate(this.angle);
    this.ctx.translate(this.c.width * -0.5, this.c.height * -0.5);
    if (debug) {
      this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
      this.ctx.fillRect(
        0,
        0,
        this.c.width,
        this.c.height
      );
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(
        this.c.width * 0.5 - this.size * .5,
        this.c.height * 0.5 - this.size * .5,
        this.size,
        this.size
      );
    }
    this.ctx.drawImage(
      img,
      this.c.width * 0.5 - this.size * .5,
      this.c.height * 0.5 - this.size * .5,
      this.size,
      this.size
    )

    this.stage.drawImage(
      this.c,
      this.pos.x - this.c.width * 0.5,
      this.pos.y - this.c.height * 0.5
    );
    
    this.ctx.restore();
  }
}