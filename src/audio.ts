import bgAudio from "../audio/background.wav";
import lAudio from "../audio/lose.wav";

const backgroundAudio = new Audio();
backgroundAudio.loop = true;
const loseAudio = new Audio();
backgroundAudio.src = bgAudio;
loseAudio.src = lAudio;

export { backgroundAudio, loseAudio };
