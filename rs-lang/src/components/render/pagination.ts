import { storage } from '../storage/localstorage';
import { state } from '../storage/state';
import { bookPage } from './bookPage';

let index: number = 0;
let total: number = 30;
class Pagination {
  render() {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('pagination-wrapper');
    buttonsDiv.insertAdjacentHTML(
      'beforeend',
      `
    <button class="paginate left"><i></i><i></i></button>
    <div class="counter"></div>
    <button class="paginate right"><i></i><i></i></button>
    `
    );
    return buttonsDiv;
  }
  addListeners() {
    let pr = document.querySelector('.paginate.left') as HTMLElement;
    let pl = document.querySelector('.paginate.right') as HTMLElement;
    pr?.addEventListener('click', () => {
      this.slide.bind(this, pr, pl, -1);
      if (state.page > 0) {
        state.page--;
        bookPage.render();
      }
    });
    pl.addEventListener('click', () => {
      this.slide.bind(this, pr, pl, 1);
      if (state.page < 29) {
        state.page++;
        bookPage.render();
      }
    });
    this.slide(pr, pl, 0);
  }
  slide(elem1: HTMLElement, elem2: HTMLElement, offset: number) {
    index = Math.min(Math.max(index + offset, 0), total - 1);

    (document.querySelector('.counter') as HTMLElement).innerHTML =
      'Страница  ' + '&nbsp' + (state.page + 1) + ' / ' + total;

    elem1.setAttribute('data-state', index === 0 ? 'disabled' : '');
    elem2.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
  }
}
export const pagination = new Pagination();
