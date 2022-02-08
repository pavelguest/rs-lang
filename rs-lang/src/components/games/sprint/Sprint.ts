import { state } from '../../storage/state';
import { getRandomInRange } from '../../helpers/helpers';
import { IWords } from '../../types/types';
import {
  rightAnswerSound,
  soundPlay,
  victoryGameSound,
  wrongAnswerSound,
} from '../../helpers/sounds';

class Sprint {
  wordsArr: IWords[] = [];
  currentQuestion: number = 0;
  score: number = 0;
  generalScore: number = 0;
  countTimerGame: number = 59;
  question: string = '';
  answerRight: string = '';
  answer: string = '';
  arr() {
    this.wordsArr = state.wordsArr;
  }
  currQuestion() {
    this.question = this.wordsArr[this.currentQuestion].word;
    this.answerRight = this.wordsArr[this.currentQuestion].wordTranslate;
    this.currentQuestion++;
    return this.question;
  }
  randomAnswer() {
    if (getRandomInRange(0, 1)) {
      return (this.answer = this.answerRight);
    } else {
      this.answer =
        this.wordsArr[
          getRandomInRange(0, this.wordsArr.length - 1)
        ].wordTranslate;
      return this.answer;
    }
  }
  setScore() {
    this.generalScore += 10;
  }
  isAnswerRight(isRight: boolean) {
    if (this.answer === this.answerRight && isRight) {
      this.score += 1;
      this.setScore();
      soundPlay(rightAnswerSound);
    } else if (this.answer !== this.answerRight && !isRight) {
      this.score += 1;
      this.setScore();
      soundPlay(rightAnswerSound);
    } else {
      soundPlay(wrongAnswerSound);
      this.score = 0;
    }
    if (this.score > 3) {
      this.score = 0;
    }
  }
  startGameTimer() {
    const interval = setInterval(() => {
      const timer = document.querySelector('.timer-container');
      if (this.countTimerGame === 0) {
        clearInterval(interval);
        this.countTimerGame = 59;
        // обнуление пагинации
        this.score = 0;
        victoryGameSound.play();
        document.querySelector('.sprint-wrapper')!.innerHTML = '';
      }
      if (timer) {
        timer.textContent = `${this.countTimerGame}`;
      }
      this.countTimerGame -= 1;
    }, 1000);
    return () => clearInterval(interval);
  }
}

export default Sprint;
