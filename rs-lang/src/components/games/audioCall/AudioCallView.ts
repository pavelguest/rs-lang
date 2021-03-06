import { Button } from '../../buttons/Button';
import { soundPlay } from '../../helpers/sounds';
import AudioCall from './AudioCall';

class AudioCallView {
  audioCall = new AudioCall();
  isAnswer: boolean = false;
  render() {
    const audioCallContainer = document.createElement('div');
    audioCallContainer.classList.add('audio-call__container');
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('audio-call__question-container');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('audio-call__question');
    questionDiv.addEventListener('click', () => {
      soundPlay(this.audioCall.getQuestion());
    });
    const audio = this.audioCall.getQuestion();
    audio.play();
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('audio-call__answers-container');
    this.audioCall.getAnswers().forEach((elem, index) => {
      const answer = new Button(
        'audio-call__answer',
        elem,
        this.isAnswerRight.bind(this, elem)
      ).render();
      answersContainer.append(answer);
      document.addEventListener(
        'keydown',
        (event) => {
          if (event.code === `Digit${index + 1}`) {
            this.isAnswerRight(elem);
          }
        },
        { once: true }
      );
    });
    const buttonsNavContainer = document.createElement('div');
    buttonsNavContainer.classList.add('buttons-nav__container');
    const buttonNoAnswer = new Button(
      'button__dont-know',
      'не знаю',
      this.nextQuestion.bind(this)
    ).render();
    document.onkeydown = (event) => {
      if (event.code === 'Space') {
        this.nextQuestion();
      }
    };

    document.querySelector('.audio-call-wrapper')!.append(audioCallContainer);
    questionContainer.append(questionDiv);
    buttonsNavContainer.append(buttonNoAnswer);
    audioCallContainer.append(
      questionContainer,
      answersContainer,
      buttonsNavContainer
    );
  }
  renderPopupQuestion() {
    const currentWord = this.audioCall.wordsArr[this.audioCall.currentQuestion];
    const questionContainer = document.querySelector(
      '.audio-call__question-container'
    );
    questionContainer!.innerHTML = '';
    questionContainer!.insertAdjacentHTML(
      'beforeend',
      `
      <img class="audio-call__question-img" src="https://rsslang.herokuapp.com/${currentWord.image}" alt="word">
      <div class="audio-call__question-text">${currentWord.word}</div>
      <div class="audio-call__question-translate">${currentWord.wordTranslate}</div>
      `
    );
  }
  isAnswerRight(word: string) {
    this.audioCall.isAnswerRight(word);
    this.isAnswer = true;
    document.querySelectorAll('.audio-call__answer')!.forEach((elem) => {
      if (elem instanceof HTMLButtonElement) {
        elem.disabled = true;
      }
    });
    document.querySelector('.button__dont-know')!.textContent = `следующий`;
    this.renderPopupQuestion();
  }
  nextQuestion() {
    if (!this.isAnswer) {
      this.isAnswer = true;
      this.isAnswerRight(' ');
    } else {
      this.isAnswer = false;
      document.querySelector('.audio-call__container')!.remove();
      this.audioCall.currentQuestion += 1;
      const isEnd = this.audioCall.isEndQuestionsGame();
      if (!isEnd) {
        this.render();
      }
    }
  }
}

export default AudioCallView;
