import { startingPage } from '../components/render/startingPage';
import { bookPage } from '../components/render/bookPage';
import { state } from '../components/storage/state';
import { storage } from '../components/storage/localstorage';
class Application {
  start() {
    startingPage.render();
    if (storage.isAuthorised) {
      bookPage.getAllDifficult();
      bookPage.getAllLearned();
    }
  }
}
const application = new Application();
application.start();
