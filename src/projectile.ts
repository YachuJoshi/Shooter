interface Velocity {
  x: number;
  y: number;
}

interface ProjectileProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: Velocity;
}

export class Projectile {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: Velocity;

  constructor(props: ProjectileProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.color = props.color;
    this.velocity = props.velocity;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update(ctx: CanvasRenderingContext2D): void {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
