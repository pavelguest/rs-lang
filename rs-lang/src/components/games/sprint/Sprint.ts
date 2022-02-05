import { state } from '../../storage/state';
import { getRandomInRange } from '../../helpers/helpers';
import { IWords } from '../../types/types';

class Sprint {
  wordsArr: IWords[] = [];
  currentQuestion: number = 0;
  score: number = 0;
  generalScore: number = 0;
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
    console.log(`question: ${this.question}`);
    console.log(`answer: ${this.answer}`, `answerRight: ${this.answerRight}`);

    if (this.answer === this.answerRight && isRight) {
      this.setScore();
    } else if (this.answer !== this.answerRight && !isRight) {
      this.setScore();
    }
  }
}

export default Sprint;
