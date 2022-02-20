import { startingPage } from '../components/render/startingPage';
import { bookPage } from '../components/render/bookPage';
import { state } from '../components/storage/state';
import { storage } from '../components/storage/localstorage';
import { getTodayDate } from '../components/helpers/helpers';
class Application {
  start() {
    startingPage.render();
    if (storage.isAuthorised) {
      bookPage.getAllDifficult();
      bookPage.getAllLearned();
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
              dateGameStatistic[getTodayDate()].sprint.newWords.split(',')
            )
          : new Set();
        state['newAudioCallWords'] = dateGameStatistic[getTodayDate()]
          ?.audioCall
          ? new Set(
              dateGameStatistic[getTodayDate()].audioCall.newWords.split(',')
            )
          : new Set();
      } else {
        state['newSprintWords'] = new Set();
        state['newAudioCallWords'] = new Set();
      }
    }
    console.log(state.newAudioCallWords);
    console.log(state.newSprintWords);
  }
}
const application = new Application();
application.start();
