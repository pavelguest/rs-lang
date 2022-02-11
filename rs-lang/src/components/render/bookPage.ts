import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { pagination } from './pagination';
import { gamesNavButtons } from '../buttons/gamesNavButtons';
import { difficultyButtons } from '../buttons/difficultyButtons';
import { CardWord } from './cardWord';
import { worldsRepository } from '../services/WordsRepository';
import { IWords, JSONObject } from '../types/types';
import { state } from '../storage/state';
import { difficultWordsService } from '../services/DifficultWordsService';
import { JSONValue } from '../types/types';
class BookPage {
  async render() {
    const arrDifficults = await this.getAllDifficult();

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
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    wrapper.append(cardsWrapper);
    const array = await worldsRepository.all(state.page, state.group);
    array.forEach((word: IWords) => {
      const wordObj = new CardWord(word);
      const card = wordObj.render();
      if (arrDifficults.includes(word.id)) {
        const p = document.createElement('p');
        card.querySelector('.add-difficults__button')?.remove();
        card.querySelector('.difficult-learned__wrapper')?.prepend(p);
        p.classList.add('difficult-stamp');
        p.textContent = 'difficult';
        /* card.append(p); */
      }
      cardsWrapper.append(card);
    });
    pagination.addListeners();
  }
  renderMain() {}
  async getAllDifficult() {
    const [paginatedResults] =
      await difficultWordsService.getAllDifficultWords();
    const arrDifficultWords = paginatedResults.paginatedResults;
    console.log(arrDifficultWords);
    const arr = arrDifficultWords.map((elem: JSONValue) => elem._id);
    return arr;
  }
}
export const bookPage = new BookPage();
