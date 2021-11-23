const scoreElement = <HTMLSpanElement>document.getElementById("score")!;
const startGameContainer = <HTMLDivElement>(
  document.getElementById("start-game-container")!
);
const startButtonElement = <HTMLButtonElement>(
  document.getElementById("start-btn")!
);
const gameOverContainerElement = <HTMLDivElement>(
  document.getElementById("game-over-container")!
);
const finalScoreElement = <HTMLHeadingElement>(
  document.getElementById("final-score")!
);
const restartGameButtonElement = <HTMLButtonElement>(
  document.getElementById("restart-game-btn")!
);
gameOverContainerElement.style.display = "none";

export {
  scoreElement,
  startGameContainer,
  startButtonElement,
  gameOverContainerElement,
  finalScoreElement,
  restartGameButtonElement,
};
