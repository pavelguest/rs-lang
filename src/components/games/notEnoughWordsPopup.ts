import { Button } from '../buttons/Button';
import { bookPage } from '../render/bookPage';
import { state } from '../storage/state';

class NotEnoughWordsPopup {
  render() {
    // const container = document.querySelector(
    //   `${typeGame === 'sprint' ? '.sprint-wrapper' : '.audio-call-wrapper'}`
    // );
    const container = document.querySelector('main') as HTMLElement;
    container.innerHTML = '';

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container__not-enough');
    const popupText = document.createElement('div');
    popupText.classList.add('popup__text');
    popupText.textContent = 'Недостаточно слов!';
    const buttonBack = new Button(
      'popup__button-back',
      'Назад',
      this.backBookPage.bind(this)
    ).render();

    popupContainer.append(popupText, buttonBack);
    container.append(popupContainer);
  }
  backBookPage() {
    state.currentPage = 'book';
    bookPage.render();
  }
}

export const notEnoughWordsPopup = new NotEnoughWordsPopup();
