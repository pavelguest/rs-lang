import { bookPage } from '../render/bookPage';
import { state } from '../storage/state';
import { Button } from './Button';
class DifficultyButtons {
  render() {
    const difficultyButtons = document.createElement('div');
    difficultyButtons.classList.add('nav-book__difficulties');
    const props: [string, () => void][] = [
      ['a1', this.changeDifficulty.bind(this, 0, 'green')],
      ['a2', this.changeDifficulty.bind(this, 1, 'yellow')],
      ['b1', this.changeDifficulty.bind(this, 2, 'blue')],
      ['b2', this.changeDifficulty.bind(this, 3, 'purple')],
      ['c1', this.changeDifficulty.bind(this, 4, 'pink')],
      ['c2', this.changeDifficulty.bind(this, 5, 'brown')],
    ];
    props.forEach((property) =>
      difficultyButtons.append(
        new Button('button-difficulty', ...property).render()
      )
    );

    return difficultyButtons;
  }
  async changeDifficulty(group: number, color: string) {
    state.difficultyColor = color;
    state.group = group;
    await bookPage.render();
    document
      .querySelectorAll('.add-difficults__button')
      .forEach((elem) => elem.classList.add(`${color}`));
    document
      .querySelectorAll('.add-learned__button')
      .forEach((elem) => elem.classList.add(`${color}`));
  }
}
export const difficultyButtons = new DifficultyButtons();
