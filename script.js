const tank = document.querySelector("#fish-tank");
const sharks = [];
let tankW = tank.clientWidth;
let tankH = tank.clientHeight;

window.addEventListener("resize", () => {
  tankW = tank.clientWidth;
  tankH = tank.clientHeight;
});

class Shark {
  constructor(img) {
    this.img = img;
    this.w = img.offsetWidth;
    this.h = img.offsetHeight;
    this.x = 0;
    this.y = 0;
    this.speed = 60 + Math.random() * 120; // pixels per second
    this.facing = 1;                        // 1 = right, -1 = left
    this.pickTarget();
  }

  pickTarget() {
    this.tx = Math.random() * (tankW - this.w);
    this.ty = Math.random() * (tankH - this.h);
  }

  update(dt) {
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step) {
      // arrived
      this.x = this.tx;
      this.y = this.ty;
      this.pickTarget();
    } else {
      // move straight toward the target
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
      if (dx !== 0) this.facing = Math.sign(dx);
    }

    this.img.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${this.facing})`;
  }
}

function addShark() {
  const img = new Image();
  img.src = "images/sharky_01.png";
  img.style.cssText = "position:absolute; left:0; top:0; width:6em; will-change:transform;";
  img.onload = () => {
    tank.appendChild(img);          // append after load so sizes are known
    sharks.push(new Shark(img));
  };
}

let last = performance.now();
function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.1); // seconds, capped after tab switches
  last = now;
  for (const s of sharks) s.update(dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

document.querySelector("button").addEventListener("click", addShark);