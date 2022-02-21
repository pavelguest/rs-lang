import { startingLoginButton } from '../buttons/startingLoginButtons';
import { renderLoginPopup } from './renderLoginPopup';
import { header } from './header';
import { bookPage } from './bookPage';
import { footer } from './footer';
class StartingPage {
  body: HTMLElement;
  constructor() {
    this.body = document.body;
  }
  render() {
    this.body.innerHTML = '';
    this.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.append(startingLoginButton.render());
    document.querySelector('.main-page__link')?.classList.add('active-page');

    const main = document.createElement('main');
    main.classList.add('main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);

    document.body.append(main);

    this.body.append(footer.render());
  }
}
export const startingPage = new StartingPage();
