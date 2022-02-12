import { getRandomInRange } from '../../helpers/helpers';
import { worldsRepository } from '../../services/WordsRepository';
import { IWords } from '../../types/types';

class AudioCall {
  wordsArr: IWords[] = [];
  question: HTMLAudioElement | undefined;
  answerRight: string = '';
  answers: string[] = [];
  currentQuestion: number = 0;

  async getWordsArr(group: number) {
    const page = getRandomInRange(0, 29);
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  getQuestion() {
    this.question = new Audio();
    this.question.src = `https://rsslang.herokuapp.com/${
      this.wordsArr[this.currentQuestion].audio
    }`;
    console.log(this.question);

    return this.question;
  }
  getAnswers() {
    this.answers = [];
    this.answerRight = this.wordsArr[this.currentQuestion].wordTranslate;
    for (let i = 0; i < 4; i++) {
      const randomAnswer = this.getWrongAnswer(this.currentQuestion);
      let answerWrong = this.wordsArr[randomAnswer].wordTranslate;
      this.answers.push(answerWrong);
    }
    this.answers.push(this.answerRight);
    this.answers.sort(() => Math.round(Math.random() * 100) - 50);
    console.log(this.answerRight, this.answers);

    return this.answers;
  }
  getWrongAnswer(currentNum: number): number {
    const randomNum = getRandomInRange(0, 19);
    return randomNum !== currentNum
      ? randomNum
      : this.getWrongAnswer(this.currentQuestion);
  }
}
