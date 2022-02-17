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
import { storage } from '../storage/localstorage';
import { rightAnswerSound } from '../helpers/sounds';
import { footer } from './footer';
class BookPage {
  async render() {
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
    wrapper.classList.add('bookpage-wrapper');
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
      if (state.difficultWords.includes(word.id)) {
        const p = document.createElement('p');
        card.querySelector('.add-difficults__button')?.remove();
        card.querySelector('.difficult-learned__wrapper')?.prepend(p);
        p.classList.add('difficult-stamp');
        p.textContent = 'difficult';
      }
      if (state.learnedWords.includes(word.id)) {
        const p = document.createElement('p');
        card.querySelector('.add-learned__button')?.remove();
        card.querySelector('.difficult-learned__wrapper')?.append(p);
        p.classList.add('learned-stamp');
        p.textContent = 'learned';
      }
      card.querySelector('.delete-difficults__button')?.remove();
      cardsWrapper.append(card);
    });
    document.body.append(footer.render());
    pagination.addListeners();
  }

  async getAllDifficult() {
    const [paginatedResults] =
      await difficultWordsService.getAllDifficultWords();
    const arrDifficultWords = paginatedResults.paginatedResults;
    const arr = arrDifficultWords.map((elem: JSONValue) => elem._id);
    state.difficultWords = [...arr];
    return arr;
  }
  async getAllLearned() {
    const [paginatedResults] = await difficultWordsService.getAllLearnedWords();
    const arrLearnedWords = paginatedResults.paginatedResults;
    const arr = arrLearnedWords.map((elem: JSONValue) => elem._id);
    state.learnedWords = [...arr];
    return arr;
  }
}
export const bookPage = new BookPage();
