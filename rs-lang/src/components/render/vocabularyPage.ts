import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { difficultWordsService } from '../services/DifficultWordsService';
import { IWords } from '../types/types';
import { CardWord } from './cardWord';
import { state } from '../storage/state';
import { removeFromArray } from '../helpers/helpers';
import { Button } from '../buttons/Button';
import { footer } from './footer';

class VocabularyPage {
  async render() {
    document.body.innerHTML = '';
    document.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.prepend(startingLoginButton.render());
    document
      .querySelector('.vocabulary-page__link')
      ?.classList.add('active-page');

    const main = document.createElement('main');
    main.classList.add('main');

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);

    document.body.append(main);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    wrapper.append(cardsWrapper);

    const array = await this.getAllDifficult();
    array.forEach((word: IWords) => {
      const wordObj = new CardWord(word);
      const card = wordObj.render();
      card.querySelector('.add-difficults__button')?.remove();
      card.querySelector('.add-learned__button')?.remove();
      const buttonDeleteFromDifficultes = new Button(
        'delete-difficults__button',
        'Удалить',
        () => {
          this.removeFromDifficult(word._id);
        }
      ).render();
      card
        .querySelector('.difficult-learned__wrapper')
        ?.append(buttonDeleteFromDifficultes);
      cardsWrapper.append(card);
    });
    document.body.append(footer.render());
  }
  async getAllDifficult() {
    const [paginatedResults] =
      await difficultWordsService.getAllDifficultWords();
    const arrDifficultWords = paginatedResults.paginatedResults;
    return arrDifficultWords;
  }
  async removeFromDifficult(wordId: string) {
    await difficultWordsService.deleteFromDifficult(wordId);
    removeFromArray(state.difficultWords, wordId);
    this.render();
  }
}
export const vocabularyPage = new VocabularyPage();
