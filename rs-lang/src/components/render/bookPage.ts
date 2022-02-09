import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { pagination } from './pagination';
import { gamesNavButtons } from '../buttons/gamesNavButtons';
import { difficultyButtons } from '../buttons/difficultyButtons';
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
    const main = document.createElement('main');
    main.classList.add('main');

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);

    document.body.append(main);

    const navBook = document.createElement('div');
    navBook.classList.add('nav-book');

    const navButtons = document.createElement('div');
    navButtons.classList.add('games-buttons_wrapper');

    navBook.append(difficultyButtons.render(), pagination.render(), navButtons);

    navButtons.append(
      gamesNavButtons.renderSprint(),
      gamesNavButtons.renderAudioChallenge()
    );

    wrapper.append(navBook);
    pagination.addListeners();
  }
  renderMain() {}
}
export const bookPage = new BookPage();
