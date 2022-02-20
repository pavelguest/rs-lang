import { getTodayDate } from '../helpers/helpers';
import { storage } from '../storage/localstorage';
import { state } from '../storage/state';

class GamesStatistic {
  setStatistic(typeGame: string, obj: any) {
    const todayDate = getTodayDate();
    if (localStorage.getItem(`${storage.idUser}-gamesStatistic`)) {
      const date = JSON.parse(
        localStorage.getItem(`${storage.idUser}-gamesStatistic`)!
      );
      state.gamesStatistic = { ...date };
    }
    console.log(state.gamesStatistic[todayDate]);

    if (!state.gamesStatistic.hasOwnProperty(todayDate)) {
      if (typeGame === 'sprint') {
        state.gamesStatistic[todayDate] = { sprint: { ...obj } };
      } else {
        state.gamesStatistic[todayDate] = { audioCall: { ...obj } };
      }
    } else {
      if (!state.gamesStatistic[todayDate].hasOwnProperty(typeGame)) {
        state.gamesStatistic[todayDate][typeGame] = obj;
      } else {
        state.gamesStatistic[todayDate][typeGame].newWords += obj.newWords;
        state.gamesStatistic[todayDate][typeGame].numberAllAnswer =
          obj.numberAllAnswer;
        state.gamesStatistic[todayDate][typeGame].numberCorrectAnswer =
          obj.numberCorrectAnswer;
        state.gamesStatistic[todayDate][typeGame].chain =
          state.gamesStatistic[todayDate][typeGame].chain > obj.chain
            ? state.gamesStatistic[todayDate][typeGame].chain
            : obj.chain;
      }
    }

    localStorage.setItem(
      `${storage.idUser}-gamesStatistic`,
      JSON.stringify(state.gamesStatistic)
    );
  }
  setNewWordsGame(data: string, typeGame: string) {
    if (typeGame === 'Sprint') {
      state.newSprintWords.add(data);
    } else {
      state.newAudioCallWords.add(data);
    }
  }
}

export const gamesStatistic = new GamesStatistic();
