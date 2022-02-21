import { startingLoginButton } from '../buttons/startingLoginButtons';
import { renderLoginPopup } from './renderLoginPopup';
import { header } from './header';
import { bookPage } from './bookPage';
import { footer } from './footer';
class StartingPage {
  body: HTMLElement;
  constructor() {
    this.body = document.body;
  }
  render() {
    this.body.innerHTML = '';
    this.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.append(startingLoginButton.render());
    document.querySelector('.main-page__link')?.classList.add('active-page');

    const main = document.createElement('main');
    main.classList.add('main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);

    document.body.append(main);

    const teamAbout = document.createElement('div');
    wrapper.append(teamAbout);
    teamAbout.insertAdjacentHTML(
      'beforeend',
      `
    <div class="team-container">
    <h2 class="team-title">О команде</h2>
    <div class="team-wrapper">
      <div class="team-pavel">
        <div class="pavel-photo">
          <img src="../../images/Pavel.jpg" alt="Pavel photo" />
        </div>
        <div class="pavel-content">
          <h3 class="pavel-title">Пучинский Павел</h3>
          <div class="pavel-link">
            <span class="pavel-github"></span
            ><a href="https://github.com/pavelguest">pavelguest</a>
          </div>
          <p class="pavel-position">Разработчик</p>
          <div class="pavel-responsibilities">
            Создал игры Спринт и Аудиовызов, реализовал логику новых слов,
            изученных слов, статистики. Принимал участие в создании стартовой
            страницы
          </div>
        </div>
      </div>
      <div class="team-denis">
        <div class="denis-photo">
          <img src="./../images/Denis.jpg" alt="Denis photo" />
        </div>
        <div class="denis-content">
          <h3 class="denis-title">Гусарь Денис</h3>
          <div class="denis-link">
            <a class="denis-link" href="https://github.com/DeGusar"><span class="denis-github"></span>DeGusar</a>
          </div>
          <p class="pavel-position">Разработчик</p>
          <div class="pavel-responsibilities">
            Отвечал за создание электронного учебника, сложных слов, за
            навигацию по разделам, страницам учебника. Реализовал регистрацию
            и авторизацию пользователя. Автор дизайна страницы со статистикой,
            принимал участие в создании стартовой страницы
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    );

    this.body.append(footer.render());
  }
}
export const startingPage = new StartingPage();
