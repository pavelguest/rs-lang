import { CreateControls } from '../buttons/CreateControls';
import { authorisation } from '../api/Authorisation';

class renderLoginPopup {
  renderLoginForm() {
    const popup = document.createElement('div');
    popup.classList.add('popup-login');
    const wrapper = document.createElement('div');
    wrapper.classList.add('popup-wrapper');
    popup.append(wrapper);
    const formLogin = document.createElement('form');
    wrapper.append(formLogin);
    formLogin.classList.add('form-login');
    formLogin.insertAdjacentHTML(
      'beforeend',
      `<input type="email" class="login-email" placeholder="e-mail" required/>
        <input type="password" class="login-password" title="Минимум 8 символов" placeholder="password" minlength="8" required/>
        <p class="login-error"></p>
        <button type="submit" class="button login-button">login</button>
        `
    );
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
      document.body.append(this.renderCreateForm());
    });
    formLogin.addEventListener('click', () => {
      (document.querySelector('.login-error') as HTMLElement).innerHTML = '';
    });
    formLogin.addEventListener('submit', this.login);
    return popup;
  }
  renderCreateForm() {
    const popup = document.createElement('div');
    popup.classList.add('popup-login');
    const wrapper = document.createElement('div');
    wrapper.classList.add('popup-wrapper');
    popup.append(wrapper);
    const formCreate = document.createElement('form');
    wrapper.append(formCreate);
    formCreate.classList.add('form-create');
    formCreate.insertAdjacentHTML(
      'beforeend',
      `
        <input type="text" class="create-name" placeholder="name" required/>
        <input type="email" class="create-email" placeholder="e-mail" required/>
        <input type="password" class="create-password" placeholder="password" minlength="8" required/>
        <p class="create-error"></p>
        <button type="submit" class="button create-button">create</button>
     `
    );
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
      document.body.append(this.renderLoginForm());
    });
    formCreate.addEventListener('click', () => {
      (document.querySelector('.create-error') as HTMLElement).innerHTML = '';
    });
    formCreate.addEventListener('submit', this.create);
    return popup;
  }
  login() {
    const email = (document.querySelector('.login-email') as HTMLInputElement)
      .value;
    const password = (
      document.querySelector('.login-password') as HTMLInputElement
    ).value;
    authorisation.login(email, password);
  }
  create() {
    const name = (document.querySelector('.create-name') as HTMLInputElement)
      .value;
    const email = (document.querySelector('.create-email') as HTMLInputElement)
      .value;
    const password = (
      document.querySelector('.create-password') as HTMLInputElement
    ).value;
    authorisation.createUser(name, email, password);
  }
}
const popupLogin = new renderLoginPopup();
document.body.append(popupLogin.renderLoginForm());
