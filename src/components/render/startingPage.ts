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
    const appMain = document.createElement('div');
    const appAbout = document.createElement('div');
    const teamAbout = document.createElement('div');
    wrapper.append(appMain);
    wrapper.append(appAbout);
    wrapper.append(teamAbout);

    appMain.insertAdjacentHTML(
      'beforeend',
      `
    <div class="app-main__container">
    <h1>RS LANG</h1>
    <p>Маленькими шагами мы достигаем больших результатов. Присоединяйся к обучению</p>
    </div>
    `
    );
    appAbout.insertAdjacentHTML(
      'beforeend',
      `
      <div class="app-info__container">
      <h2 class="team-title">О приложении</h2>
      <div class="app-info__wrapper">
      <div class="app-info__chapter">
      <div class="pavel-photo">
          <img src="./images/textbook.jpg" alt="Pavel photo" />
        </div>
        <div class="pavel-content">
          <h3 class="pavel-title">Учебник</h3>
          <div class="pavel-responsibilities">
          Учебник состоит из шести разделов. В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также произношение как слова отдельно, так и в составе словосочетания.
          </div>
        </div>
      </div>
      <div class="app-info__chapter">
      <div class="pavel-photo">
          <img src="./images/dictionary.jpg" alt="Pavel photo" />
        </div>
        <div class="pavel-content">
          <h3 class="pavel-title">Словарь</h3>
          <div class="pavel-responsibilities">
          Словарь содержит списки изучаемых слов, которые вызывают затруднения.
          </div>
        </div>
      </div>
      <div class="app-info__chapter">
      <div class="pavel-photo">
          <img src="./images/games.jpg" alt="Pavel photo" />
        </div>
        <div class="pavel-content">
          <h3 class="pavel-title">Игры</h3>
          <div class="pavel-responsibilities">
          В этом разделе есть 2 игры: Спринт и Аудиовызов, которые помогут вам в игровой форме закрепить знания и пополнить словарный запас.
          </div>
        </div>
      </div>
      <div class="app-info__chapter">
      <div class="pavel-photo">
          <img src="./images/statistic.jpg" alt="Pavel photo" />
        </div>
        <div class="pavel-content">
          <h3 class="pavel-title">Статистика</h3>
          <div class="pavel-responsibilities">
            В этом разделе можно увидеть весь прогресс обучения, где представлены данные за текущий день. Краткосрочная информация о мини-играх и о словах.
        </div>
      </div>
      </div>
      
      </div>
    `
    );

    teamAbout.insertAdjacentHTML(
      'beforeend',
      `
    <div class="team-container">
    <h2 class="team-title">О команде</h2>
    <div class="team-wrapper">
      <div class="team-pavel">
        <div class="pavel-photo">
          <img src="./images/Pavel.jpg" alt="Pavel photo" />
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
          <img src="./images/Denis.jpg" alt="Denis photo" />
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
