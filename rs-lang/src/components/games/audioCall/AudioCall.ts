import { getRandomInRange } from '../../helpers/helpers';
import {
  rightAnswerSound,
  soundPlay,
  victoryGameSound,
  wrongAnswerSound,
} from '../../helpers/sounds';
import { worldsRepository } from '../../services/WordsRepository';
import { state } from '../../storage/state';
import { ILearnWords, IWords } from '../../types/types';
import { gamesStatistic } from '../GamesStatistic';
import ResultGamePopup from '../ResultGamePopup';
import { wordsStatistic } from '../WordsStatistic';

class AudioCall {
  wordsArr: IWords[] = [];
  learnWords: ILearnWords[] = [];
  question: HTMLAudioElement | undefined;
  answerRight: string = '';
  answers: string[] = [];
  currentQuestion: number = 0;
  numberOfCorrectAnswers: number = 0;
  numberAllAnswers: number = 0;
  longestChain: number = 0;
  currentLongestChain: number = 0;
  isAnswer: boolean = false;

  async getWordsArr(group: number) {
    const page = getRandomInRange(0, 29);
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  async getWordsArrForBook(group: number, page: number) {
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  setLongestChain(isRight: boolean) {
    if (isRight) {
      this.currentLongestChain += 1;
    } else {
      if (this.currentLongestChain > this.longestChain) {
        this.longestChain = this.currentLongestChain;
        this.currentLongestChain = 0;
      } else {
        this.currentLongestChain = 0;
      }
    }
  }
  isEndQuestionsGame() {
    if (this.currentQuestion === 20) {
      gamesStatistic.setStatistic('audioCall', {
        newWords: [...state.newAudioCallWords],
        numberAllAnswer: this.numberAllAnswers,
        numberCorrectAnswer: this.numberOfCorrectAnswers,
        chain: this.longestChain,
      });

      const popup = new ResultGamePopup('audioCall').render(this.learnWords, 0);
      document.querySelector('.audio-call-wrapper')!.append(popup);
      this.learnWords = [];
      this.currentQuestion = 0;
      this.currentLongestChain = 0;
      this.longestChain = 0;
      this.numberAllAnswers = 0;
      this.numberOfCorrectAnswers = 0;
      victoryGameSound.play();
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
    this.answers.push(this.answerRight);
    for (let i = 0; i < 4; i++) {
      this.getWrongAnswers();
    }
    this.answers.sort(() => Math.round(Math.random() * 100) - 50);
    console.log(this.answerRight, this.answers);

    return this.answers;
  }
  getWrongAnswers() {
    const randomNum = getRandomInRange(0, 19);
    let answerWrong = this.wordsArr[randomNum].wordTranslate;
    if (!this.answers.includes(answerWrong)) {
      this.answers.push(answerWrong);
    } else {
      this.getWrongAnswers();
    }
  }
  isAnswerRight(word: string) {
    if (word === this.answerRight) {
      soundPlay(rightAnswerSound);
      this.isAnswer = true;
      this.numberOfCorrectAnswers += 1;
    } else {
      soundPlay(wrongAnswerSound);
      this.isAnswer = false;
    }
    this.numberAllAnswers += 1;
    this.setLongestChain(this.isAnswer);
    gamesStatistic.setNewWordsGame(
      this.wordsArr[this.currentQuestion].id,
      'AudioCall'
    );
    wordsStatistic.setAnswerWords(
      this.wordsArr[this.currentQuestion].id,
      this.isAnswer
    );
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
