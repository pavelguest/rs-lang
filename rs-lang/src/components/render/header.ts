import { state } from '../storage/state';
import { startingPage } from './startingPage';
import { bookPage } from './bookPage';
import { statsPage } from './statsPage';
import { gamePreload } from './GamePreload';
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
    document
      .querySelector('.stats-page__link')
      ?.addEventListener('click', () => {
        this.deleteActiveClass();
        state.currentPage = 'stats';
        statsPage.render();
      });
    document.querySelector('.sprint__link')?.addEventListener('click', () => {
      if (state.currentPage === 'main') {
        gamePreload.render('sprint');
      }
    });
    document
      .querySelector('.audio-call__link')
      ?.addEventListener('click', () => {
        if (state.currentPage === 'main') {
          gamePreload.render('audiocall');
        }
      });
  }
  deleteActiveClass() {
    document
      .querySelectorAll('.navigation__link')
      .forEach((elem) => elem.classList.remove('active-page'));
  }
}
export const header = new Header();
