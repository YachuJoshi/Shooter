import { Player } from "./player";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./base";

type Object = Player | Enemy | Projectile;

interface PlayerMovement {
  [key: string]: string;
}

export const playerMovementKeys: PlayerMovement = {
  w: "UP",
  a: "LEFT",
  s: "DOWN",
  d: "RIGHT",
};

export const checkBoundaryCollision = (object: Object): boolean => {
  return (
    object.x - object.radius < 0 ||
    object.x + object.radius > CANVAS_WIDTH ||
    object.y - object.radius < 0 ||
    object.y + object.radius > CANVAS_HEIGHT
  );
};

export const getDistance = (self: Object, next: Object): number => {
  return Math.hypot(self.x - next.x, self.y - next.y);
};
