import { Button } from '../buttons/Button';
import { audioCallViewWrapper } from './audioCall/AudioCallViewWrapper';
import sprintViewWrapper from './sprint';
import { startGameDelay } from './StartGameDelay';
import { startingPage } from '../render/startingPage';

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
        this.selectGroupGame.bind(this, i, typeGame)
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
  async selectGroupGame(group: number, typeGame: string) {
    if (typeGame === 'sprint') {
      startGameDelay.awaitStartGameRender(this.startSprintGame.bind(this));
      sprintViewWrapper.sprintView.sprint.getWordsArr(group);
    } else {
      startGameDelay.awaitStartGameRender(this.startAudioCallGame.bind(this));
      audioCallViewWrapper.audioCallView.audioCall.getWordsArr(group);
    }
  }
  backGame() {
    startingPage.render();
  }
  startSprintGame() {
    sprintViewWrapper.render();
  }
  startAudioCallGame() {
    audioCallViewWrapper.render();
  }
}

export const gamePreload = new GamePreload();
