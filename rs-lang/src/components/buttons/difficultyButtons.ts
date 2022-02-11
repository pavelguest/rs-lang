import { bookPage } from '../render/bookPage';
import { state } from '../storage/state';
import { Button } from './Button';
class DifficultyButtons {
  render() {
    const difficultyButtons = document.createElement('div');
    difficultyButtons.classList.add('nav-book__difficulties');
    const props: [string, () => void][] = [
      ['a1', this.changeDifficulty.bind(this, 0)],
      ['a2', this.changeDifficulty.bind(this, 1)],
      ['b1', this.changeDifficulty.bind(this, 2)],
      ['b2', this.changeDifficulty.bind(this, 3)],
      ['c1', this.changeDifficulty.bind(this, 4)],
      ['c2', this.changeDifficulty.bind(this, 5)],
    ];
    props.forEach((property) =>
      difficultyButtons.append(
        new Button('button-difficulty', ...property).render()
      )
    );

    return difficultyButtons;
  }
  changeDifficulty(group: number) {
    state.group = group;
    bookPage.render();
  }
}
export const difficultyButtons = new DifficultyButtons();
