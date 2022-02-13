import { audioCallViewWrapper } from '../games/audioCall/AudioCallViewWrapper';
import sprintViewWrapper from '../games/sprint';
import { startGameDelay } from '../games/StartGameDelay';
import { state } from '../storage/state';
import { Button } from './Button';
class GamesNavButtons {
  renderSprint() {
    const button = new Button(
      'bookpage-sprint__button',
      'Спринт',
      this.startSprint.bind(this)
    ).render();
    const span = document.createElement('span');
    button.prepend(span);
    return button;
  }
  renderAudioChallenge() {
    const button = new Button(
      'bookpage-audiochallenge__button',
      'Аудиовызов',
      this.startAudioChallenge.bind(this)
    ).render();
    const span = document.createElement('span');
    button.prepend(span);
    return button;
  }
  startSprint() {
    startGameDelay.awaitStartGameRender(this.sprint.bind(this));
    sprintViewWrapper.sprintView.sprint.getWordsArrForBook(
      state.group,
      state.page
    );
  }
  startAudioChallenge() {
    startGameDelay.awaitStartGameRender(this.audioCall.bind(this));
    audioCallViewWrapper.audioCallView.audioCall.getWordsArrForBook(
      state.group,
      state.page
    );
  }
  sprint() {
    sprintViewWrapper.render();
  }
  audioCall() {
    audioCallViewWrapper.render();
  }
}
export const gamesNavButtons = new GamesNavButtons();
