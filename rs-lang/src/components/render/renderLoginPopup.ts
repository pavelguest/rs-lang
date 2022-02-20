import { Button } from '../buttons/Button';
import { authorisation } from '../services/AuthorisationRepository';
import { storage } from '../storage/localstorage';
import { startingPage } from './startingPage';
import { constants } from '../helpers/constansts';
import { bookPage } from './bookPage';
import { state } from '../storage/state';
class RenderLoginPopup {
  renderLoginForm(container: HTMLElement) {
    const popup = document.createElement('div');
    popup.classList.add('popup-login');
    const closePopup = document.createElement('div');
    closePopup.classList.add('close-popup');
    popup.append(closePopup);
    closePopup.addEventListener('click', () => popup.remove());
    const wrapper = document.createElement('div');
    wrapper.classList.add('popup-wrapper');
    popup.append(wrapper);
    const formLogin = document.createElement('form');
    formLogin.action = '#';
    wrapper.append(formLogin);
    formLogin.classList.add('form-login');
    formLogin.insertAdjacentHTML(
      'beforeend',
      `<input type="email" class="login-email" placeholder="e-mail" required/>
        <input type="password" class="login-password" pattern="^[a-zA-Z0-9]*$" title="Минимум 8 символов" placeholder="password" minlength="8" required/>
        <p class="login-error"></p>
       
        `
    );
    const button = new Button(
      'login-button',
      'login',
      this.login.bind(this)
    ).render();
    button.type = 'submit';
    formLogin.append(button);
    const pLogin = document.createElement('p');
    pLogin.classList.add('login-text');
    pLogin.textContent = 'Not registered?';
    const aLogin = document.createElement('a');
    aLogin.classList.add('.link-login');
    aLogin.textContent = 'Create an account';
    pLogin.append(aLogin);
    formLogin.append(pLogin);
    aLogin.addEventListener('click', () => {
      popup.remove();
      document.body.append(this.RenderCreateForm());
    });
    container.append(popup);
  }
  RenderCreateForm() {
    const popup = document.createElement('div');
    popup.classList.add('popup-login');
    const closePopup = document.createElement('div');
    closePopup.classList.add('close-popup');
    popup.append(closePopup);
    closePopup.addEventListener('click', () => popup.remove());
    const wrapper = document.createElement('div');
    wrapper.classList.add('popup-wrapper');
    popup.append(wrapper);
    const formCreate = document.createElement('form');
    formCreate.action = '#';
    wrapper.append(formCreate);
    formCreate.classList.add('form-create');
    formCreate.insertAdjacentHTML(
      'beforeend',
      `
        <input type="text" class="create-name" placeholder="name" required/>
        <input type="email" class="create-email" placeholder="e-mail" required/>
        <input type="password" class="create-password" pattern="^[a-zA-Z0-9]*$" placeholder="password" minlength="8" required/>
        <p class="create-error"></p>
     `
    );
    const button = new Button(
      'create-button',
      'create',
      this.create.bind(this)
    ).render();
    button.type = 'submit';
    formCreate.append(button);
    const pCreate = document.createElement('p');
    pCreate.classList.add('login-text');
    pCreate.textContent = 'Already registered?';
    const aCreate = document.createElement('a');
    aCreate.classList.add('.link-create');
    aCreate.textContent = 'Sign In';
    pCreate.append(aCreate);
    formCreate.append(pCreate);
    aCreate.addEventListener('click', () => {
      popup.remove();
      this.renderLoginForm(document.body);
    });
    return popup;
  }
  async login() {
    const emailInput = document.querySelector(
      '.login-email'
    ) as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = document.querySelector(
      '.login-password'
    ) as HTMLInputElement;
    const password = passwordInput.value;
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      const response = await authorisation.login(email, password);
      if (response.status === 200) {
        const loginResponse = await response.json();
        storage.token = loginResponse.token;
        storage.refreshToken = loginResponse.refreshToken;
        storage.idUser = loginResponse.userId;
        storage.name = loginResponse.name;
        storage.isAuthorised = true;
        storage.tokenExpirationDate = Date.now() + constants.TOKEN_EXPIRE_TIME;
        storage.save();
        state.gamesStatistic = {};
        const dateGameStatistic = JSON.parse(
          localStorage.getItem(`${storage.idUser}-gamesStatistic`)!
        );
        const dateWordsStatistic = JSON.parse(
          localStorage.getItem(`${storage.idUser}-wordsStatistic`)!
        );
        state.gamesStatistic = { ...dateGameStatistic };
        state.wordsStatistic = { ...dateWordsStatistic };
        startingPage.render();
        await bookPage.getAllDifficult();
        bookPage.getAllLearned();
      } else if (response.status === 404 || response.status === 403) {
        (document.querySelector('.login-error') as HTMLElement).innerHTML =
          'Wrong e-mail or password';
        window.setTimeout(
          () =>
            ((document.querySelector('.login-error') as HTMLElement).innerHTML =
              ''),
          3000
        );
      }
    }
  }
  async create() {
    const nameInput = document.querySelector(
      '.create-name'
    ) as HTMLInputElement;
    const name = nameInput.value;
    const emailInput = document.querySelector(
      '.create-email'
    ) as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = document.querySelector(
      '.create-password'
    ) as HTMLInputElement;
    const password = passwordInput.value;
    if (
      nameInput.checkValidity() &&
      emailInput.checkValidity() &&
      passwordInput.checkValidity()
    ) {
      const response = await authorisation.createUser(name, email, password);
      if (response.status === 200) {
        (document.querySelector('.popup-login') as HTMLElement)?.remove();
        this.renderLoginForm(document.body);
      } else if (response.status === 417) {
        (document.querySelector('.create-error') as HTMLElement).innerHTML =
          'User with this e-mail exists';
        window.setTimeout(
          () =>
            ((
              document.querySelector('.create-error') as HTMLElement
            ).innerHTML = ''),
          3000
        );
      }
    }
  }
}
export const renderLoginPopup = new RenderLoginPopup();
