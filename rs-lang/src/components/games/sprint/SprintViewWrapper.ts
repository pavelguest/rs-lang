import {
  rightAnswerSound,
  soundMute,
  victoryGameSound,
  wrongAnswerSound,
} from '../../helpers/sounds';
import { startingPage } from '../../render/startingPage';
import SprintView from './SprintView';

class SprintViewWrapper {
  sprintView = new SprintView();
  render() {
    document.body.innerHTML = '';

    const main = document.createElement('main');

    const sprintWrapper = document.createElement('div');
    sprintWrapper.classList.add('sprint-wrapper');

    const sprintTitle = document.createElement('h2');
    sprintTitle.classList.add('sprint__title');
    sprintTitle.textContent = 'Спринт';

    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer-container');
    timerDiv.textContent = '60';

    const settingsButtonsContainer = document.createElement('div');
    settingsButtonsContainer.classList.add('settings-buttons__container');
    const buttonFullScreen = document.createElement('div');
    buttonFullScreen.classList.add('settings-buttons__fullscreen');
    buttonFullScreen.addEventListener('click', () => this.fullScreen());
    const buttonVolume = document.createElement('div');
    buttonVolume.classList.add('settings-buttons__volume');
    buttonVolume.addEventListener('click', () => {
      this.muteVolume();
      buttonVolume.classList.toggle('active-volume');
    });

    const closeButtonGame = document.createElement('div');
    closeButtonGame.classList.add('sprint__close-game');
    closeButtonGame.addEventListener('click', () => {
      this.closeGame();
    });

    document.body.append(main);
    main.append(sprintTitle, settingsButtonsContainer);
    settingsButtonsContainer.append(buttonFullScreen, buttonVolume);
    main.append(closeButtonGame, sprintWrapper);
    sprintWrapper.append(timerDiv);

    this.sprintView.runGame();
    this.sprintView.render();
  }
  closeGame() {
    if (this.sprintView.stopGameTimer) {
      this.sprintView.stopGameTimer();
      this.sprintView.sprint.countTimerGame = 59;
      this.sprintView.sprint.score = 0;
      this.sprintView.sprint.currentQuestion = 0;
      this.sprintView.sprint.generalScore = 0;

      this.sprintView.sprint.numberAllAnswers = 0;
      this.sprintView.sprint.numberOfCorrectAnswers = 0;
      this.sprintView.sprint.longestChain = 0;
      this.sprintView.sprint.idLearnWords = [];
      this.sprintView.sprint.learnWords = [];
    }
    startingPage.render();
  }
  fullScreen() {
    document
      .querySelector('.settings-buttons__fullscreen')!
      .classList.toggle('active-fullscreen');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector('main')!.requestFullscreen();
    }
  }
  muteVolume() {
    soundMute(rightAnswerSound, wrongAnswerSound, victoryGameSound);
  }
}

export const sprintViewWrapper = new SprintViewWrapper();
