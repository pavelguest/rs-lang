import { getRandomInRange } from '../../helpers/helpers';
import { ICardWord, ILearnWords, IWords } from '../../types/types';
import {
  rightAnswerSound,
  soundPlay,
  victoryGameSound,
  wrongAnswerSound,
} from '../../helpers/sounds';
import ResultGamePopup from '../ResultGamePopup';
import { worldsRepository } from '../../services/WordsRepository';
import { state } from '../../storage/state';
import { wordsStatistic } from '../WordsStatistic';
import { gamePreload } from '../GamePreload';
import { gamesStatistic } from '../GamesStatistic';
import { storage } from '../../storage/localstorage';

class Sprint {
  id: string = 'id';
  wordsArr: IWords[] = [];
  learnWords: ILearnWords[] = [];
  idLearnWords: string[] = [];
  currentQuestion: number = 0;
  numberOfCorrectAnswers: number = 0;
  numberAllAnswers: number = 0;
  longestChain: number = 0;
  currentLongestChain: number = 0;
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
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  async getWordsArrForBook(group: number, page: number) {
    const data = await worldsRepository.all(page, group);
    this.wordsArr = [...data];
  }
  async getWordsArrForUser(data: IWords[]) {
    this.wordsArr = [...data];
  }
  getCurrentQuestion() {
    this.question = this.wordsArr[this.currentQuestion].word;
    this.answerRight = this.wordsArr[this.currentQuestion].wordTranslate;
    return this.question;
  }
  isEndQuestionsGame() {
    if (this.currentQuestion === this.wordsArr.length) {
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
  isAnswerRight(isRight: boolean) {
    const idNumber = this.id !== 'id' ? '_id' : 'id';
    if (
      (this.answer === this.answerRight && isRight) ||
      (this.answer !== this.answerRight && !isRight)
    ) {
      this.score += 1;
      this.setScore();
      soundPlay(rightAnswerSound);
      this.isAnswer = true;
      this.numberOfCorrectAnswers += 1;
    } else {
      soundPlay(wrongAnswerSound);
      this.score = 0;
      this.isAnswer = false;
    }
    this.setLongestChain(this.isAnswer);
    if (this.score > 3) {
      this.generalScore += 40;
      this.score = 0;
    }
    this.numberAllAnswers += 1;
    if (storage.isAuthorised) {
      gamesStatistic.setNewWordsGame(
        this.wordsArr[this.currentQuestion][idNumber],
        'Sprint'
      );
      wordsStatistic.setAnswerWords(
        this.wordsArr[this.currentQuestion][idNumber],
        this.isAnswer
      );
    }
    const resultObj = {
      id: this.wordsArr[this.currentQuestion][idNumber],
      word: this.wordsArr[this.currentQuestion].word,
      audio: this.wordsArr[this.currentQuestion].audio,
      wordTranslate: this.wordsArr[this.currentQuestion].wordTranslate,
      isAnswer: this.isAnswer,
    };
    if (
      !this.idLearnWords.includes(this.wordsArr[this.currentQuestion][idNumber])
    ) {
      this.idLearnWords.push(this.wordsArr[this.currentQuestion][idNumber]);
      this.learnWords.push(resultObj);
    } else {
      this.learnWords.forEach((elem, index, arr) => {
        if (elem.id === this.wordsArr[this.currentQuestion][idNumber]) {
          elem.isAnswer = this.isAnswer;
        }
      });
    }
    this.currentQuestion += 1;
  }

  startGameTimer() {
    const interval = setInterval(() => {
      const timer = document.querySelector('.timer-container');
      if (this.countTimerGame === 0) {
        document.querySelector('.sprint-wrapper')!.innerHTML = '';
        const popup = new ResultGamePopup('sprint').render(
          this.learnWords,
          this.generalScore
        );
        document.querySelector('.sprint-wrapper')!.append(popup);
        clearInterval(interval);
        if (storage.isAuthorised) {
          gamesStatistic.setStatistic('sprint', {
            newWords: [...state.newSprintWords],
            numberAllAnswer: this.numberAllAnswers,
            numberCorrectAnswer: this.numberOfCorrectAnswers,
            chain: this.longestChain,
          });
        }
        this.generalScore = 0;
        this.countTimerGame = 59;
        this.score = 0;
        this.numberAllAnswers = 0;
        this.numberOfCorrectAnswers = 0;
        this.longestChain = 0;
        this.learnWords = [];
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
