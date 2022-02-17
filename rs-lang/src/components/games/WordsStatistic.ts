import { state } from '../storage/state';
import { IRightWord } from '../types/types';

class WordsStatistic {
  setAnswerWords(wordId: string, isAnswer: boolean) {
    if (!state.wordsStatistic.hasOwnProperty(wordId)) {
      const obj: IRightWord = { correct: 0, inCorrect: 0 };
      if (isAnswer) {
        obj.correct += 1;
      } else {
        obj.inCorrect += 1;
      }
      state.wordsStatistic.wordId = { ...obj };
    } else {
      if (isAnswer) {
        state.wordsStatistic[wordId].correct += 1;
      } else {
        state.wordsStatistic[wordId].inCorrect += 1;
      }
    }
    console.log(state.wordsStatistic);
  }
}

export const wordsStatistic = new WordsStatistic();
