import { getTodayDate } from '../helpers/helpers';
import { storage } from '../storage/localstorage';
import { state } from '../storage/state';

class StorageStatistic {
  getStatisticData() {
    const dateGameStatistic = JSON.parse(
      localStorage.getItem(`${storage.idUser}-gamesStatistic`)!
    );
    const dateWordsStatistic = JSON.parse(
      localStorage.getItem(`${storage.idUser}-wordsStatistic`)!
    );
    state.gamesStatistic = { ...dateGameStatistic };
    state.wordsStatistic = { ...dateWordsStatistic };

    if (state.gamesStatistic.hasOwnProperty(getTodayDate())) {
      state['newSprintWords'] = dateGameStatistic[getTodayDate()]?.sprint
        ? new Set(
            Array.isArray(dateGameStatistic[getTodayDate()].sprint.newWords)
              ? dateGameStatistic[getTodayDate()].sprint.newWords
              : dateGameStatistic[getTodayDate()].sprint.newWords.split(',')
          )
        : new Set();
      state['newAudioCallWords'] = dateGameStatistic[getTodayDate()]?.audioCall
        ? new Set(
            Array.isArray(dateGameStatistic[getTodayDate()].audioCall.newWords)
              ? dateGameStatistic[getTodayDate()].audioCall.newWords
              : dateGameStatistic[getTodayDate()].audioCall.newWords.split(',')
          )
        : new Set();
    } else {
      state['newSprintWords'] = new Set();
      state['newAudioCallWords'] = new Set();
    }
  }
}

export const storageStatistic = new StorageStatistic();
