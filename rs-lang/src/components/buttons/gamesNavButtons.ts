import { audioCallViewWrapper } from '../games/audioCall/AudioCallViewWrapper';
import { notEnoughWordsPopup } from '../games/notEnoughWordsPopup';
import sprintViewWrapper from '../games/sprint';
import { startGameDelay } from '../games/StartGameDelay';
import { difficultWordsService } from '../services/DifficultWordsService';
import { storage } from '../storage/localstorage';
import { state } from '../storage/state';
import { IWords } from '../types/types';
import { Button } from './Button';
class GamesNavButtons {
  renderSprint() {
    const button = new Button(
      'bookpage-sprint__button',
      'Спринт',
      this.startSprint.bind(this)
    ).render();
    const span = document.createElement('span');
    button.prepend(span);
    return button;
  }
  renderAudioChallenge() {
    const button = new Button(
      'bookpage-audiochallenge__button',
      'Аудиовызов',
      this.startAudioChallenge.bind(this)
    ).render();
    const span = document.createElement('span');
    button.prepend(span);
    return button;
  }
  async startSprint() {
    startGameDelay.awaitStartGameRender(this.sprint.bind(this));
    if (storage.isAuthorised) {
      sprintViewWrapper.sprintView.sprint.id = '_id';
      sprintViewWrapper.sprintView.sprint.getWordsArrForUser(
        await this.getNoLearnedWords()
      );
    } else {
      sprintViewWrapper.sprintView.sprint.id = 'id';
      sprintViewWrapper.sprintView.sprint.getWordsArrForBook(
        state.group,
        state.page
      );
    }
  }
  async startAudioChallenge() {
    startGameDelay.awaitStartGameRender(this.audioCall.bind(this));
    if (storage.isAuthorised) {
      audioCallViewWrapper.audioCallView.audioCall.id = '_id';
      audioCallViewWrapper.audioCallView.audioCall.getWordsArrForUser(
        await this.getNoLearnedWords()
      );
    } else {
      audioCallViewWrapper.audioCallView.audioCall.id = 'id';
      audioCallViewWrapper.audioCallView.audioCall.getWordsArrForBook(
        state.group,
        state.page
      );
    }
  }
  sprint() {
    if (sprintViewWrapper.sprintView.sprint.wordsArr.length <= 4) {
      notEnoughWordsPopup.render();
    } else {
      sprintViewWrapper.render();
    }
  }
  audioCall() {
    if (audioCallViewWrapper.audioCallView.audioCall.wordsArr.length <= 4) {
      notEnoughWordsPopup.render();
    } else {
      audioCallViewWrapper.render();
    }
  }
  async getNoLearnedWords() {
    const notLearnedWords =
      await difficultWordsService.getAllUserNoLearnedWords();
    console.log('notLearnedWords', notLearnedWords);
    console.log('state', state.learnedWords);

    if (typeof notLearnedWords === 'number') return;
    const notLearnedWordsFilteredBePage = notLearnedWords.filter(
      (word: IWords) => {
        return (
          !state.learnedWords.includes(word._id) && word.page <= state.page
        );
      }
    );
    console.log('notLearnedWords', notLearnedWordsFilteredBePage);
    const last20Words = notLearnedWordsFilteredBePage.slice(-20);
    console.log('last20Words', last20Words);
    return last20Words;
  }
}
export const gamesNavButtons = new GamesNavButtons();
