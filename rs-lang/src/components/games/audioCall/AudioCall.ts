import { getRandomInRange } from '../../helpers/helpers';
import {
  rightAnswerSound,
  soundPlay,
  wrongAnswerSound,
} from '../../helpers/sounds';
import { worldsRepository } from '../../services/WordsRepository';
import { ILearnWords, IWords } from '../../types/types';
import ResultGamePopup from '../ResultGamePopup';

class AudioCall {
  wordsArr: IWords[] = [];
  learnWords: ILearnWords[] = [];
  question: HTMLAudioElement | undefined;
  answerRight: string = '';
  answers: string[] = [];
  currentQuestion: number = 0;
  isAnswer: boolean = false;

  async getWordsArr(group: number) {
    const page = getRandomInRange(0, 29);
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  isEndQuestionsGame() {
    if (this.currentQuestion === 20) {
      const popup = new ResultGamePopup('audioCall').render(this.learnWords, 0);
      document.querySelector('.audio-call-wrapper')!.append(popup);
      this.currentQuestion = 0;
      return true;
    }
    return false;
  }
  getQuestion() {
    this.question = new Audio();
    this.question.src = `https://rsslang.herokuapp.com/${
      this.wordsArr[this.currentQuestion].audio
    }`;
    console.log(this.question);
    this.question.play();
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
  isAnswerRight(word: string) {
    if (word === this.answerRight) {
      soundPlay(rightAnswerSound);
      this.isAnswer = true;
    } else {
      soundPlay(wrongAnswerSound);
      this.isAnswer = false;
    }
    this.learnWords.push({
      id: this.wordsArr[this.currentQuestion].id,
      word: this.wordsArr[this.currentQuestion].word,
      audio: this.wordsArr[this.currentQuestion].audio,
      wordTranslate: this.wordsArr[this.currentQuestion].wordTranslate,
      isAnswer: this.isAnswer,
    });
  }
}

export default AudioCall;
