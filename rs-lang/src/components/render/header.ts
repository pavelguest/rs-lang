import { state } from '../storage/state';
import { startingPage } from './startingPage';
import { bookPage } from './bookPage';
import { statsPage } from './statsPage';
import { gamePreload } from '../games/GamePreload';
import { Button } from '../buttons/Button';
import { vocabularyPage } from './vocabularyPage';
import { storage } from '../storage/localstorage';
import { getTodayDate } from '../helpers/helpers';
import { startGameDelay } from '../games/StartGameDelay';
import sprintViewWrapper from '../games/sprint';
import { audioCallViewWrapper } from '../games/audioCall/AudioCallViewWrapper';
class Header {
  render() {
    const header = document.createElement('header');
    header.classList.add('header');
    header.insertAdjacentHTML(
      'beforeend',
      `
          <div class="wrapper header__wrapper">
           
            <nav class="header__navigation">
              <ul class="navigation">
                <li class="navigation__link main-page__link"><a href="#">Главная</a></li>
                <li class="navigation__link book-page__link"><a href="#">Учебник</a></li>
                <li class="navigation__link vocabulary-page__link"><a href="#">Словарь</a></li>
                <li class="navigation__link stats-page__link"><a href="#">Статистика</a></li>
                <li class="navigation__link games-list">
                  <a href="#">Игры</a>
                  <span class="navigation__arrow arrow"></span>
                  <ul class="sub-menu__list">
                    <li class="audio-call__link"><a class="sub-menu__link" href="#">Аудиовызов</a></li>
                    <li class="sprint__link"><a class="sub-menu__link" href="#">Спринт</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          `
    );
    return header;
  }
  addlisteners() {
    document
      .querySelector('.main-page__link')
      ?.addEventListener('click', () => {
        this.deleteActiveClass();
        state.currentPage = 'main';
        startingPage.render();
      });
    document
      .querySelector('.book-page__link')
      ?.addEventListener('click', () => {
        this.deleteActiveClass();
        state.currentPage = 'book';
        bookPage.render();
      });

    const vocabPage = document.querySelector('.vocabulary-page__link');
    const statPage = document.querySelector('.stats-page__link');
    if (!storage.isAuthorised) {
      vocabPage?.classList.add('hidden');
      statPage?.classList.add('hidden');
    }
    vocabPage?.addEventListener('click', () => {
      this.deleteActiveClass();
      state.currentPage = 'vocabulary';
      vocabularyPage.render();
    });
    statPage?.addEventListener('click', () => {
      this.deleteActiveClass();
      state.currentPage = 'stats';
      statsPage.render();
    });
    document.querySelector('.sprint__link')?.addEventListener('click', () => {
      if (state.currentPage === 'book') {
        startGameDelay.awaitStartGameRender(this.sprint.bind(this));
        sprintViewWrapper.sprintView.sprint.id = 'id';
        sprintViewWrapper.sprintView.sprint.getWordsArrForBook(
          state.group,
          state.page
        );
      } else {
        gamePreload.render('sprint');
      }
    });
    document
      .querySelector('.audio-call__link')
      ?.addEventListener('click', () => {
        if (state.currentPage === 'book') {
          startGameDelay.awaitStartGameRender(this.audioCall.bind(this));
          audioCallViewWrapper.audioCallView.audioCall.id = 'id';
          audioCallViewWrapper.audioCallView.audioCall.getWordsArrForBook(
            state.group,
            state.page
          );
        } else {
          gamePreload.render('audiocall');
        }
      });
  }
  sprint() {
    sprintViewWrapper.render();
  }
  audioCall() {
    audioCallViewWrapper.render();
  }

  deleteActiveClass() {
    document
      .querySelectorAll('.navigation__link')
      .forEach((elem) => elem.classList.remove('active-page'));
  }
}
export const header = new Header();
