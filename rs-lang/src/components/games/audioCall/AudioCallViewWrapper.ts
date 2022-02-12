import { startingPage } from '../../render/startingPage';
import AudioCallView from './AudioCallView';

class AudioCallViewWrapper {
  audioCallView = new AudioCallView();
  render() {
    document.body.innerHTML = '';

    const main = document.createElement('main');

    const audioCallWrapper = document.createElement('div');
    audioCallWrapper.classList.add('audio-call-wrapper');

    const audioCallTitle = document.createElement('h2');
    audioCallTitle.classList.add('audio-call__title');
    audioCallTitle.textContent = 'Аудиовызов';
    const settingsButtonsContainer = document.createElement('div');
    settingsButtonsContainer.classList.add('settings-buttons__container');
    const buttonFullScreen = document.createElement('div');
    buttonFullScreen.classList.add('settings-buttons__fullscreen');
    buttonFullScreen.addEventListener('click', () => this.fullScreen());
    const closeButtonGame = document.createElement('div');
    closeButtonGame.classList.add('sprint__close-game');
    closeButtonGame.addEventListener('click', () => {
      this.closeGame();
    });

    document.body.append(main);
    main.append(audioCallTitle, settingsButtonsContainer);
    settingsButtonsContainer.append(buttonFullScreen);
    main.append(closeButtonGame, audioCallWrapper);

    this.audioCallView.render();
  }
  fullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector('main')!.requestFullscreen();
    }
  }
  closeGame() {
    startingPage.render();
  }
}

export const audioCallViewWrapper = new AudioCallViewWrapper();
