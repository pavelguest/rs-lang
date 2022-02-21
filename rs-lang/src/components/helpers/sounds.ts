export const rightAnswerSound = new Audio();
export const wrongAnswerSound = new Audio();
export const victoryGameSound = new Audio();

export const wordAudio = new Audio();
export const meaningAudio = new Audio();
export const exampleAudio = new Audio();
rightAnswerSound.src = './../audio/correct-answer-sound.mp3';
wrongAnswerSound.src = './../audio/incorrect-answer-sound.mp3';
victoryGameSound.src = './../audio/pravil-nyy-otvet-krasavchiki.mp3';

export const soundPlay = (audio: HTMLAudioElement) => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
};
export const soundMute = (...sounds: HTMLAudioElement[]) => {
  sounds.forEach((elem) => {
    if (elem.muted) {
      elem.muted = false;
    } else {
      elem.muted = true;
    }
  });
};
