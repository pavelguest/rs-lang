import { Button } from '../../buttons/Button';
import Sprint from './Sprint';

class SprintView {
  sprint = new Sprint();
  stopGameTimer: (() => void) | undefined;
  async runGame() {
    this.stopGameTimer = this.sprint.startGameTimer();
  }
  render() {
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint-container');

    const scoreDiv = document.createElement('div');
    scoreDiv.textContent = `${this.sprint.generalScore}`;
    scoreDiv.classList.add('sprint__score');
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('sprint__pagination-container');

    for (let i = 0; i < 3; i++) {
      const answerPagination = document.createElement('div');
      answerPagination.classList.add('sprint__answer-pagination');
      paginationContainer.append(answerPagination);
    }

    const gameQuestion = document.createElement('div');
    gameQuestion.classList.add('sprint__question');

    const gameAnswer = document.createElement('div');
    gameAnswer.classList.add('sprint__answer');

    const answerButtonsContainer = document.createElement('div');
    answerButtonsContainer.classList.add('answer-buttons__container');

    const falseAnswer = new Button(
      'false-answer',
      'неверно',
      this.isCorrectAnswer.bind(this, false)
    ).render();
    const trueAnswer = new Button(
      'true-answer',
      'верно',
      this.isCorrectAnswer.bind(this, true)
    ).render();

    gameQuestion.textContent = `${this.sprint.getCurrentQuestion()}`;
    gameAnswer.textContent = `${this.sprint.randomAnswer()}`;

    sprintContainer.append(
      scoreDiv,
      paginationContainer,
      gameQuestion,
      gameAnswer,
      answerButtonsContainer
    );
    answerButtonsContainer.append(falseAnswer, trueAnswer);
    document.querySelector('.sprint-wrapper')!.append(sprintContainer);
    document
      .querySelectorAll('.sprint__answer-pagination')
      .forEach((elem, index) => {
        if (index < this.sprint.score && elem instanceof HTMLElement) {
          elem.style.background = '#60bee4';
        }
      });
  }
  isCorrectAnswer(check: boolean) {
    this.sprint.isAnswerRight(check);
    document.querySelector('.sprint-container')!.remove();
    // this.sprint.isEndQuestionsGame();
    this.render();
  }
}

export default SprintView;
