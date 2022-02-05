import { worldsRepository } from '../../services/WordsRepository';
import Sprint from './Sprint';

class SprintView {
  sprint = new Sprint();
  async runGame() {
    await worldsRepository.all();
    this.sprint.arr();
    this.render();
  }
  render() {
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint-container');

    const scoreContainer = document.createElement('div');
    scoreContainer.textContent = `${this.sprint.generalScore}`;

    const gameQuestion = document.createElement('div');
    gameQuestion.classList.add('game-question');

    const gameAnswer = document.createElement('div');
    gameAnswer.classList.add('game-answer');

    const trueAnswer = document.createElement('button');
    const falseAnswer = document.createElement('button');

    trueAnswer.addEventListener('click', () => {
      this.sprint.isAnswerRight(true);
      this.render();
    });
    falseAnswer.addEventListener('click', () => {
      this.sprint.isAnswerRight(false);
      this.render();
    });

    trueAnswer.textContent = `yes`;
    falseAnswer.textContent = `no`;

    gameQuestion.textContent = `${this.sprint.currQuestion()}`;
    gameAnswer.textContent = `${this.sprint.randomAnswer()}`;

    sprintContainer.append(scoreContainer);
    sprintContainer.append(gameQuestion);
    sprintContainer.append(gameAnswer);
    sprintContainer.append(trueAnswer);
    sprintContainer.append(falseAnswer);
    document.body.append(sprintContainer);
  }
}

export const sprintView = new SprintView();
