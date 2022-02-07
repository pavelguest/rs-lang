import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { pagination } from './pagination';
import { gamesNavButtons } from '../buttons/gamesNavButtons';
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

    navBook.append(pagination.render());
    navBook.append(navButtons);
    navButtons.append(gamesNavButtons.renderSprint());
    navButtons.append(gamesNavButtons.renderAudioChallenge());

    wrapper.append(navBook);
    pagination.addListeners();
  }
  renderMain() {}
}
export const bookPage = new BookPage();
