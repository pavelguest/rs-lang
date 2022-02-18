import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { footer } from './footer';
class StatsPage {
  render() {
    document.body.innerHTML = '';
    document.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.prepend(startingLoginButton.render());
    document.querySelector('.stats-page__link')?.classList.add('active-page');

    const main = document.createElement('main');
    main.classList.add('main');
    main.classList.add('stats-main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);

    document.body.append(main);

    const h2 = document.createElement('h2');
    h2.classList.add('stats-title');
    h2.textContent = 'Статистика за сегодня';
    wrapper.append(h2);

    const statsWrapper = document.createElement('div');
    statsWrapper.classList.add('stats-content__wrapper');
    statsWrapper.insertAdjacentHTML(
      'beforeend',
      `
      <div class="stats-global">
      <div class="stats-global__learned">
        <h3>
          <b>0</b>
        </h3>
        <p>Изученных слов</p>
      </div>
      <div class="stats-global__new">
        <h3>
          <b>0</b>
        </h3>
        <p>Новых слов</p>
      </div>
      <div class="stats-global__accuracy">
        <p>Правильных ответов</p>
        <div class="progress-circle p0">
          <span>0%</span>
          <div class="left-half-clipper">
            <div class="first50-bar"></div>
            <div class="value-bar"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="stats-games__wrapper">
    <h2>Спринт</h2>
      <div class="stats-sprint">
      
        <div class="stats-sprint__new">
          <h3>
            <b>0</b>
          </h3>
          <p>Новых слов</p>
        </div>
        <div class="stats-sprint__streak">
          <h3>
            <b>0</b>
          </h3>
          <p>Серия правильных ответов</p>
        </div>
        <div class="stats-sprint__accuracy">
          <p>Правильных ответов</p>
          <div class="progress-circle p0">
            <span>0%</span>
            <div class="left-half-clipper">
              <div class="first50-bar"></div>
              <div class="value-bar"></div>
            </div>
          </div>
        </div>
      </div>
      <h2>Аудиовызов</h2>
        <div class="stats-audiochallenge">
        
          <div class="stats-audiochallenge__new">
            <h3>
              <b>0</b>
            </h3>
            <p>Новых слов</p>
          </div>
          <div class="stats-audiochallenge__streak">
            <h3>
              <b>0</b>
            </h3>
            <p>Серия правильных ответов</p>
          </div>
          <div class="stats-audiochallenge__accuracy">
            <p>Правильных ответов</p>
            <div class="progress-circle p0">
              <span>0%</span>
              <div class="left-half-clipper">
                <div class="first50-bar"></div>
                <div class="value-bar"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
    `
    );
    wrapper.append(statsWrapper);
    document.body.append(footer.render());
  }
}
export const statsPage = new StatsPage();
