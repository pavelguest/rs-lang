import { Button } from '../buttons/Button';
import sprintViewWrapper from '../games/sprint';
import { worldsRepository } from '../services/WordsRepository';
import { startingPage } from './startingPage';

class GamePreload {
  render(typeGame: string) {
    document.body.innerHTML = '';

    const main = document.createElement('main');

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');

    const gameTitle = document.createElement('h2');
    gameTitle.classList.add('game__title');
    gameTitle.textContent = typeGame === 'sprint' ? 'спринт' : 'аудиовызов';

    const lvlGameSubtitle = document.createElement('p');
    lvlGameSubtitle.classList.add('game-lvl__subtitle');
    lvlGameSubtitle.textContent = 'Выберите уровень игры';

    const lvlButtonsContainer = document.createElement('div');
    lvlButtonsContainer.classList.add('game-lvl__buttons-container');

    for (let i = 0; i < 6; i++) {
      const buttonSelectLvlGame = new Button(
        'game-lvl__button',
        `${i + 1}`,
        this.selectLvlGame.bind(this, 0, i, typeGame)
      ).render();
      lvlButtonsContainer.append(buttonSelectLvlGame);
    }

    const buttonBack = new Button(
      'game__button-back',
      'Вернутся на главную',
      this.backGame.bind(this)
    ).render();

    document.body.append(main);
    main.append(gameWrapper);
    gameWrapper.append(gameTitle);
    gameWrapper.append(lvlGameSubtitle);
    gameWrapper.append(lvlButtonsContainer);
    gameWrapper.append(buttonBack);
  }
  async selectLvlGame(page: number, lvl: number, typeGame: string) {
    await worldsRepository.all(page, lvl);
    if (typeGame === 'sprint') {
      sprintViewWrapper.render();
    }
  }
  backGame() {
    startingPage.render();
  }
}

export const gamePreload = new GamePreload();
