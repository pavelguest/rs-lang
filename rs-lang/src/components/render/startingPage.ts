import { startingLoginButton } from '../buttons/startingLoginButtons';
class StartingPage {
  body: HTMLElement;
  constructor() {
    this.body = document.body;
  }
  render() {
    this.body.append(this.renderHeader());
    document
      .querySelector('.header__wrapper')
      ?.prepend(startingLoginButton.render());
  }
  renderHeader() {
    const header = document.createElement('header');
    header.classList.add('header');
    header.insertAdjacentHTML(
      'beforeend',
      `
      <div class="wrapper header__wrapper">
       
        <nav class="header__navigation">
          <ul class="navigation">
            <li class="navigation__link"><a href="#">Главная</a></li>
            <li class="navigation__link"><a href="#">Учебник</a></li>
            <li class="navigation__link"><a href="#">Статистика</a></li>
            <li class="navigation__link games-list">
              <a href="#">Игры</a>
              <span class="navigation__arrow arrow"></span>
              <ul class="sub-menu__list">
                <li><a class="sub-menu__link" href="#">Аудиовызов</a></li>
                <li><a class="sub-menu__link" href="#">Спринт</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      `
    );

    return header;
  }
}
const startingPage = new StartingPage();
startingPage.render();
