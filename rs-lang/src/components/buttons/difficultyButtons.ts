import { bookPage } from '../render/bookPage';
import { state } from '../storage/state';
import { Button } from './Button';
class DifficultyButtons {
  render() {
    const difficultyButtons = document.createElement('div');
    difficultyButtons.classList.add('nav-book__difficulties');
    const buttonA1 = new Button(
      'button-difficulty',
      'a1',
      this.changeDifficulty.bind(this, 0)
    ).render();
    const buttonA2 = new Button(
      'button-difficulty',
      'a2',
      this.changeDifficulty.bind(this, 1)
    ).render();
    const buttonB1 = new Button(
      'button-difficulty',
      'b1',
      this.changeDifficulty.bind(this, 2)
    ).render();
    const buttonB2 = new Button(
      'button-difficulty',
      'b2',
      this.changeDifficulty.bind(this, 3)
    ).render();
    const buttonC1 = new Button(
      'button-difficulty',
      'c1',
      this.changeDifficulty.bind(this, 4)
    ).render();
    const buttonC2 = new Button(
      'button-difficulty',
      'c2',
      this.changeDifficulty.bind(this, 5)
    ).render();
    difficultyButtons.append(
      buttonA1,
      buttonA2,
      buttonB1,
      buttonB2,
      buttonC1,
      buttonC2
    );
    return difficultyButtons;
  }
  changeDifficulty(group: number) {
    state.group = group;
    bookPage.render();
  }
}
export const difficultyButtons = new DifficultyButtons();
