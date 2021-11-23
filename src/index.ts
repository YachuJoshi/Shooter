import { initCanvas } from "./canvas";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Enemy } from "./enemy";
import { Particle } from "./particle";
import {
  scoreElement,
  startGameContainer,
  startButtonElement,
  gameOverContainerElement,
  finalScoreElement,
  restartGameButtonElement,
} from "./elements";
import gsap from "gsap";
import "./style.css";

type Object = Player | Enemy | Projectile;

let interval: number;
let enemyInterval: NodeJS.Timer;
let score: number = 0;
const { canvas, ctx } = initCanvas();
let projectiles: Projectile[] = [];
let enemies: Enemy[] = [];
let particles: Particle[] = [];

const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: "white",
});

const checkBoundaryCollision = (object: Object): boolean => {
  return (
    object.x - object.radius < 0 ||
    object.x + object.radius > canvas.width ||
    object.y - object.radius < 0 ||
    object.y + object.radius > canvas.height
  );
};

const getDistance = (self: Object, next: Object): number => {
  return Math.hypot(self.x - next.x, self.y - next.y);
};

const spawnEnemies = (): void => {
  enemyInterval = setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;
    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      // Direction
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy({ x, y, radius, color, velocity }));
  }, 1000);
};

const animate = (): void => {
  interval = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  scoreElement.textContent = `${score}`;

  projectiles.forEach((projectile, index) => {
    projectile.update(ctx);

    if (checkBoundaryCollision(projectile)) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });

  particles.forEach((particle) => {
    particle.update(ctx);
  });

  enemies.forEach((enemy, eIndex) => {
    enemy.update(ctx);

    const enemyPlayerDistance = getDistance(enemy, player);
    if (enemyPlayerDistance - enemy.radius - player.radius < 1) {
      gameOverContainerElement.style.display = "flex";
      finalScoreElement.textContent = `${score}`;
      cancelAnimationFrame(interval);
      clearInterval(enemyInterval);
    }

    projectiles.forEach((projectile, pIndex) => {
      const enemyProjectileDistance = getDistance(enemy, projectile);

      // Enemy / Particle collision
      if (enemyProjectileDistance - enemy.radius - projectile.radius < 1) {
        // Create particle
        for (let i = 0; i < 8; i++) {
          particles.push(
            new Particle({
              x: enemy.x,
              y: enemy.y,
              radius: 4,
              color: enemy.color,
              velocity: {
                x: Math.random() < 0.5 ? -Math.random() : Math.random(),
                y: Math.random() < 0.5 ? -Math.random() : Math.random(),
              },
            })
          );
        }

        if (enemy.radius - 10 > 5) {
          // Shrink Enemy
          score += 100;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(pIndex, 1);
          }, 0);
        } else {
          score += 250;
          setTimeout(() => {
            enemies.splice(eIndex, 1);
            projectiles.splice(pIndex, 1);
          }, 0);
        }
      }
    });
  });
};

const init = () => {
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;

  startGameContainer.style.display = "none";
  gameOverContainerElement.style.display = "none";
  animate();
  spawnEnemies();
};

canvas.addEventListener("click", (e) => {
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  projectiles.push(
    new Projectile({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 5,
      color: "white",
      velocity: {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
      },
    })
  );
});

startButtonElement.addEventListener("click", () => {
  init();
});

restartGameButtonElement.addEventListener("click", () => {
  init();
});
