import sprintViewWrapper from '.';
import { Button } from '../../buttons/Button';
import { soundPlay } from '../../helpers/sounds';
import { ILearnWords } from '../../types/types';
import { gamePreload } from '../../render/GamePreload';

class SprintResultGamePopup {
  render(answers: ILearnWords[], score: number) {
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('game__result-wrapper');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('game__result-container');
    const totalScore = document.createElement('div');
    totalScore.classList.add('game__result-score');
    totalScore.textContent = `Общий балл: ${score}`;
    const rightAnswerTitle = document.createElement('div');
    const wrongAnswerTitle = document.createElement('div');
    rightAnswerTitle.classList.add('answer-title');
    wrongAnswerTitle.classList.add('answer-title');
    const rightAnswerContainer = document.createElement('div');
    const wrongAnswerContainer = document.createElement('div');
    rightAnswerContainer.classList.add('result-container__answers');
    wrongAnswerContainer.classList.add('result-container__answers');
    const popupButtonsContainer = document.createElement('div');
    popupButtonsContainer.classList.add('game__result-buttons');
    const buttonGameOver = new Button(
      'button__game-over',
      'выйти в меню',
      this.gameOver.bind(this)
    ).render();
    const buttonTryAgainGame = new Button(
      'button__try-again',
      'играть снова',
      this.tryAgain.bind(this)
    ).render();
    popupButtonsContainer.append(buttonGameOver, buttonTryAgainGame);

    let totalRightAnswers = 0;
    let totalWrongAnswers = 0;

    answers.forEach((answer, index) => {
      const audioWord = new Audio();
      audioWord.src = `https://rsslang.herokuapp.com/${answer.audio}`;
      const answersContainer = answer.isAnswer
        ? rightAnswerContainer
        : wrongAnswerContainer;
      if (answer.isAnswer) {
        totalRightAnswers += 1;
      } else {
        totalWrongAnswers += 1;
      }
      const answerResult = document.createElement('div');
      answerResult.classList.add('answer__result');
      const answerAudio = document.createElement('div');
      answerAudio.classList.add('result-word__play');
      answerAudio.addEventListener('click', () => {
        soundPlay(audioWord);
      });
      const answerText = document.createElement('p');
      answerText.textContent = `${answer.word.toUpperCase()} - ${
        answer.wordTranslate
      }`;
      answersContainer.append(answerResult);
      answerResult.append(answerAudio, answerText);
    });

    rightAnswerTitle.textContent = `Знаю: ${totalRightAnswers}`;
    wrongAnswerTitle.textContent = `Ошибок: ${totalWrongAnswers}`;

    popupContainer.append(
      rightAnswerTitle,
      rightAnswerContainer,
      wrongAnswerTitle,
      wrongAnswerContainer
    );
    popupWrapper.append(totalScore, popupContainer, popupButtonsContainer);
    return popupWrapper;
  }
  gameOver() {
    sprintViewWrapper.closeGame();
  }
  tryAgain() {
    gamePreload.selectGroupGame(
      sprintViewWrapper.sprintView.sprint.currentLvl,
      'sprint'
    );
  }
}

export const sprintResultGamePopup = new SprintResultGamePopup();
