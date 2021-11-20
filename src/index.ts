import { initCanvas } from "./canvas";
import { Player } from "./player";
import { Projectile } from "./projectile";
import "./style.css";

let interval: number;
const { canvas, ctx } = initCanvas();
const projectiles: Projectile[] = [];

const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 30,
  color: "blue",
});

const animate = (): void => {
  interval = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);

  projectiles.forEach((projectile) => {
    projectile.update(ctx);
  });
};

canvas.addEventListener("click", (e) => {
  const angle = Math.atan2(
    canvas.height / 2 - e.clientY,
    canvas.width / 2 - e.clientX
  );
  projectiles.push(
    new Projectile({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 5,
      color: "red",
      velocity: {
        x: -Math.cos(angle) * 2,
        y: -Math.sin(angle) * 2,
      },
    })
  );
});

animate();
