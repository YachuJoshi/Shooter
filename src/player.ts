interface PlayerProps {
  x: number;
  y: number;
  radius: number;
  color: string;
}

export class Player {
  x: number;
  y: number;
  radius: number;
  color: string;

  constructor(props: PlayerProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.color = props.color;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  move(direction: string): void {
    switch (direction) {
      case "LEFT":
        this.x -= 15;
        break;
      case "RIGHT":
        this.x += 15;
        break;
      case "UP":
        this.y -= 15;
        break;
      case "DOWN":
        this.y += 15;
        break;
    }
  }
}
