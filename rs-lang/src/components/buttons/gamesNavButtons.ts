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
  startSprint() {}
  startAudioChallenge() {}
}
export const gamesNavButtons = new GamesNavButtons();
