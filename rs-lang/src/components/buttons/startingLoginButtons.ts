import { CreateControls } from './CreateControls';
import { renderLoginPopup } from '../render/renderLoginPopup';
import { storage } from '../storage/localstorage';
import { authorisation } from '../api/Authorisation';

class StartingLoginButton {
  render() {
    let button = null as HTMLElement | null;
    if (!storage.isAuthorised) {
      button = new CreateControls(
        'starting-page__login',
        'Войти',
        this.openLoginPopup.bind(this)
      ).render();
    } else {
      button = new CreateControls(
        'starting-page__login',
        'Выйти',
        authorisation.logout.bind(this)
      ).render();
    }
    return button;
  }
  openLoginPopup() {
    renderLoginPopup.renderLoginForm(document.body);
  }
}
export const startingLoginButton = new StartingLoginButton();
