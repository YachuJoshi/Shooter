interface Velocity {
  x: number;
  y: number;
}

interface ParticleProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: Velocity;
}

export class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: Velocity;
  alpha: number;

  constructor(props: ParticleProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.color = props.color;
    this.velocity = props.velocity;
    this.alpha = 1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    this.alpha -= 0.01;
    this.alpha = this.alpha < 0 ? 0 : this.alpha;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(ctx: CanvasRenderingContext2D): void {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
