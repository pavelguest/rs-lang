import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
class BookPage {
  render() {
    document.body.innerHTML = '';
    document.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.prepend(startingLoginButton.render());
    document.querySelector('.book-page__link')?.classList.add('active-page');
  }
}
export const bookPage = new BookPage();
