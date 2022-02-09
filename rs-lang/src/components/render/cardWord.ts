import { ICardWord } from '../types/types';
import { worldsRepository } from '../services/WordsRepository';
import {
  soundPlay,
  wordAudio,
  meaningAudio,
  exampleAudio,
} from '../helpers/sounds';
import { IWords } from '../types/types';
import { state } from '../storage/state';
export class CardWord {
  id: string;
  group: number;
  page: number;
  word: string;
  urlImage: string;
  urlAudio: string;
  urlAudioMeaning: string;
  urlAudioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  constructor(properties: IWords) {
    this.id = properties.id;
    this.group = properties.group;
    this.page = properties.page;
    this.word = properties.word;
    this.urlImage = properties.image;
    this.urlAudio = properties.audio;
    this.urlAudioMeaning = properties.audioMeaning;
    this.urlAudioExample = properties.audioExample;
    this.textMeaning = properties.textMeaning;
    this.textExample = properties.textExample;
    this.transcription = properties.transcription;
    this.wordTranslate = properties.wordTranslate;
    this.textMeaningTranslate = properties.textMeaningTranslate;
    this.textExampleTranslate = properties.textExampleTranslate;
  }
  render() {
    const div = document.createElement('div');
    div.classList.add('card-word');
    div.insertAdjacentHTML(
      'beforeend',
      `
    <div class="card-word__image">
      <img src='https://rsslang.herokuapp.com/${this.urlImage}' alt="${this.word} image" >
    </div>
    `
    );
    const divCardContent = document.createElement('div');
    divCardContent.classList.add('card-word__content');
    const divWordWrapper = document.createElement('div');
    divWordWrapper.insertAdjacentHTML(
      'beforeend',
      `
<p class="word__english">${this.word}</p>
<p class="word__transcription">${this.transcription}</p>
<p class="word__russian">${this.wordTranslate}</p>
`
    );
    divCardContent.classList.add('word-wrapper');
    const divMeaningWrapper = document.createElement('div');
    divMeaningWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <p class="meaning__english">${this.textMeaning}</p>
        <p class="meaning__russian">${this.textMeaningTranslate}</p>
`
    );
    divCardContent.classList.add('meaning-wrapper');
    const divExampleWrapper = document.createElement('div');
    divExampleWrapper.insertAdjacentHTML(
      'beforeend',
      `
<p class="example__english">${this.textExample}</p>
<p class="example__russian">${this.textExampleTranslate}</p>
`
    );
    divCardContent.classList.add('example-wrapper');
    divCardContent.append(divWordWrapper, divMeaningWrapper, divExampleWrapper);
    div.append(divCardContent);
    const span = document.createElement('span');
    divWordWrapper.append(span);
    span.classList.add('word__audio');
    span.addEventListener('click', () => this.playAudio());

    return div;
  }
  playAudio() {
    wordAudio.src = `https://rsslang.herokuapp.com/${this.urlAudio}`;
    meaningAudio.src = `https://rsslang.herokuapp.com/${this.urlAudioMeaning}`;
    exampleAudio.src = `https://rsslang.herokuapp.com/${this.urlAudioExample}`;
    soundPlay(wordAudio);
    wordAudio.onended = function () {
      soundPlay(meaningAudio);
    };
    meaningAudio.onended = function () {
      soundPlay(exampleAudio);
    };
  }
}
