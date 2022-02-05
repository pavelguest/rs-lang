import { Button } from '../buttons/Button';
import { renderLoginPopup } from '../render/renderLoginPopup';
import { storage } from '../storage/localstorage';
import { authorisation } from '../services/AuthorisationRepository';

class StartingLoginButton {
  render() {
    let button = null as HTMLElement | null;
    if (!storage.isAuthorised) {
      button = new Button(
        'starting-page__login',
        'Войти',
        this.openLoginPopup.bind(this)
      ).render();
    } else {
      button = new Button(
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
