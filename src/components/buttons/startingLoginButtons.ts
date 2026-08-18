import { Button } from '../buttons/Button';
import { renderLoginPopup } from '../render/renderLoginPopup';
import { storage } from '../storage/localstorage';
import { authorisation } from '../services/AuthorisationRepository';
import { startingPage } from '../render/startingPage';

class StartingLoginButton {
  render() {
    const props: [string, () => void] = storage.isAuthorised
      ? ['Выйти', this.logout.bind(this)]
      : ['Войти', this.openLoginPopup.bind(this)];
    return new Button('starting-page__login', ...props).render();
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
