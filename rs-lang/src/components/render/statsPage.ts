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

    document.body.append(footer.render());
  }
}
export const statsPage = new StatsPage();
