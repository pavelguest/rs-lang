import { getRandomInRange } from '../../helpers/helpers';
import { ILearnWords, IWords } from '../../types/types';
import {
  rightAnswerSound,
  soundPlay,
  victoryGameSound,
  wrongAnswerSound,
} from '../../helpers/sounds';
import { sprintResultGamePopup } from './SprintResultGamePopup';
import { worldsRepository } from '../../services/WordsRepository';
import { state } from '../../storage/state';
import sprintViewWrapper from '.';

class Sprint {
  wordsArr: IWords[] = [];
  learnWords: ILearnWords[] = [];
  currentQuestion: number = 0;
  score: number = 0;
  generalScore: number = 0;
  countTimerGame: number = 59;
  currentPage: number = 0;
  currentLvl: number = 0;
  question: string = '';
  answerRight: string = '';
  answer: string = '';
  isAnswer: boolean = false;
  async getWordsArr(group: number) {
    const page = getRandomInRange(0, 29);
    console.log(page);

    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  getCurrentQuestion() {
    this.question = this.wordsArr[this.currentQuestion].word;
    this.answerRight = this.wordsArr[this.currentQuestion].wordTranslate;
    return this.question;
  }
  async isEndQuestionsGame() {
    if (this.currentQuestion === 19) {
      this.currentQuestion = 0;
    }
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
    if (
      (this.answer === this.answerRight && isRight) ||
      (this.answer !== this.answerRight && !isRight)
    ) {
      this.score += 1;
      this.setScore();
      soundPlay(rightAnswerSound);
      this.isAnswer = true;
    } else {
      soundPlay(wrongAnswerSound);
      this.score = 0;
      this.isAnswer = false;
    }
    if (this.score > 3) {
      this.generalScore += 40;
      this.score = 0;
    }
    this.learnWords.push({
      id: this.wordsArr[this.currentQuestion].id,
      word: this.wordsArr[this.currentQuestion].word,
      audio: this.wordsArr[this.currentQuestion].audio,
      wordTranslate: this.wordsArr[this.currentQuestion].wordTranslate,
      isAnswer: this.isAnswer,
    });

    this.currentQuestion += 1;
  }
  startGameTimer() {
    const interval = setInterval(() => {
      const timer = document.querySelector('.timer-container');
      if (this.countTimerGame === 0) {
        document.querySelector('.sprint-wrapper')!.innerHTML = '';
        const popup = sprintResultGamePopup.render(
          this.learnWords,
          this.generalScore
        );
        document.querySelector('.sprint-wrapper')!.append(popup);
        clearInterval(interval);
        this.generalScore = 0;
        this.countTimerGame = 59;
        this.score = 0;
        victoryGameSound.play();
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
