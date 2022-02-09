import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { CardWord } from './cardWord';
import { worldsRepository } from '../services/WordsRepository';
import { IWords } from '../types/types';
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
