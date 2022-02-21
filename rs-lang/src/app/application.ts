import { startingPage } from '../components/render/startingPage';
import { bookPage } from '../components/render/bookPage';
import { state } from '../components/storage/state';
import { storage } from '../components/storage/localstorage';
import { getTodayDate } from '../components/helpers/helpers';
import { storageStatistic } from '../components/games/StorageStatistic';
class Application {
  start() {
    startingPage.render();
    if (storage.isAuthorised) {
      bookPage.getAllDifficult();
      bookPage.getAllLearned();
      storageStatistic.getStatisticData();
    }
  }
}
const application = new Application();
application.start();
