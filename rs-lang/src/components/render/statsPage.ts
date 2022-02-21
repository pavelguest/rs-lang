import { header } from './header';
import { startingLoginButton } from '../buttons/startingLoginButtons';
import { footer } from './footer';
import { state } from '../storage/state';
import { getTodayDate } from '../helpers/helpers';
import { difficultWordsService } from '../services/DifficultWordsService';
import { JSONValue } from '../types/types';
class StatsPage {
  async render() {
    const learnedWordsQuantity = await this.getAllLearnedDaily();
    document.body.innerHTML = '';
    document.body.append(header.render());
    header.addlisteners();
    document
      .querySelector('.header__wrapper')
      ?.append(startingLoginButton.render());
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
          <b>${learnedWordsQuantity}</b>
        </h3>
        <p>Изученных слов</p>
      </div>
      <div class="stats-global__new">
        <h3>
          <b>${
            (state.newAudioCallWords.size ? state.newAudioCallWords.size : 0) +
            (state.newSprintWords.size ? state.newSprintWords.size : 0)
          }</b>
        </h3>
        <p>Новых слов</p>
      </div>
      <div class="stats-global__accuracy">
        <p>Правильных ответов</p>
        <div class="progress-circle p${this.getAllStatAccuracy()} ${
        +this.getAllStatAccuracy() > 50 ? 'over50' : ''
      }">
          <span>${this.getAllStatAccuracy()}%</span>
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
            <b>${state.newSprintWords.size ? state.newSprintWords.size : 0}</b>
          </h3>
          <p>Новых слов</p>
        </div>
        <div class="stats-sprint__streak">
          <h3>
            <b>${state.gamesStatistic[getTodayDate()]?.sprint?.chain ?? 0}</b>
          </h3>
          <p>Серия правильных ответов</p>
        </div>
        <div class="stats-sprint__accuracy">
          <p>Правильных ответов</p>
          <div class="progress-circle p${this.getSprintAccuracyStat()} ${
        +this.getSprintAccuracyStat() > 50 ? 'over50' : ''
      }">
            <span>${this.getSprintAccuracyStat()}%</span>
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
              <b>${
                state.newAudioCallWords.size ? state.newAudioCallWords.size : 0
              }</b>
            </h3>
            <p>Новых слов</p>
          </div>
          <div class="stats-audiochallenge__streak">
            <h3>
              <b>${
                state.gamesStatistic[getTodayDate()]?.audioCall?.chain ?? 0
              }</b>
            </h3>
            <p>Серия правильных ответов</p>
          </div>
          <div class="stats-audiochallenge__accuracy">
            <p>Правильных ответов</p>
            <div class="progress-circle p${this.getAudioCallAccuracyStat()} ${
        +this.getAudioCallAccuracyStat() > 50 ? 'over50' : ''
      }">
              <span>${this.getAudioCallAccuracyStat()}%</span>
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
  getSprintAccuracyStat() {
    const numCorrect =
      state.gamesStatistic[getTodayDate()]?.sprint?.numberCorrectAnswer ?? 0;
    const numAll =
      state.gamesStatistic[getTodayDate()]?.sprint?.numberAllAnswer ?? 0;
    return numCorrect === 0 ? 0 : ((numCorrect / numAll) * 100).toFixed();
  }
  getAudioCallAccuracyStat() {
    const numCorrect =
      state.gamesStatistic[getTodayDate()]?.audioCall?.numberCorrectAnswer ?? 0;
    const numAll =
      state.gamesStatistic[getTodayDate()]?.audioCall?.numberAllAnswer ?? 0;
    return numCorrect === 0 ? 0 : ((numCorrect / numAll) * 100).toFixed();
  }
  getAllStatAccuracy() {
    const numCorrectSprint =
      state.gamesStatistic[getTodayDate()]?.sprint?.numberCorrectAnswer ?? 0;
    const numAllSprint =
      state.gamesStatistic[getTodayDate()]?.sprint?.numberAllAnswer ?? 0;
    const numCorrectAudioCall =
      state.gamesStatistic[getTodayDate()]?.audioCall?.numberCorrectAnswer ?? 0;
    const numAllAudioCall =
      state.gamesStatistic[getTodayDate()]?.audioCall?.numberAllAnswer ?? 0;
    let result;
    if (numAllAudioCall && numAllSprint) {
      result = (
        ((numCorrectAudioCall + numCorrectSprint) /
          (numAllAudioCall + numAllSprint)) *
        100
      ).toFixed();
    } else if (numAllAudioCall) {
      result = ((numCorrectAudioCall / numAllAudioCall) * 100).toFixed();
    } else if (numAllSprint) {
      result = ((numCorrectSprint / numAllSprint) * 100).toFixed();
    } else {
      result = 0;
    }
    return result;
  }
  async getAllLearnedDaily() {
    const [paginatedResults] =
      await difficultWordsService.getAllLearnedWordsDaily();
    const arrLearnedWords = paginatedResults.paginatedResults;
    const arr = arrLearnedWords.map((elem: JSONValue) => elem._id);
    return arr.length;
  }
}
export const statsPage = new StatsPage();
