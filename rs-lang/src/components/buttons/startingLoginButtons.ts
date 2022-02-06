import { Button } from '../buttons/Button';
import { renderLoginPopup } from '../render/renderLoginPopup';
import { storage } from '../storage/localstorage';
import { authorisation } from '../services/AuthorisationRepository';
import { startingPage } from '../render/startingPage';

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
        this.logout.bind(this)
      ).render();
    }
    return button;
  }
  openLoginPopup() {
    (document.querySelector('.popup-login') as HTMLElement)?.remove();
    renderLoginPopup.renderLoginForm(document.body);
  }
  logout() {
    authorisation.logout();
    startingPage.render();
  }
}
export const startingLoginButton = new StartingLoginButton();
