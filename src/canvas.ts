interface CanvasReturn {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export const initCanvas = (): CanvasReturn => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
  const ctx = canvas.getContext("2d")!;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  return { canvas, ctx };
};
