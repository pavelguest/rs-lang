export interface IWords {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IState {
  currentPage: string;
  group: number;
  page: number;
  wordsArr: IWords[];
  difficultWords: string[];
  learnedWords: string[];
}

export interface ILocalStorage {
  idUser: string;
  name: string;
  token: string;
  refreshToken: string;
  isAuthorised: boolean;
  tokenExpirationDate: number;
}

export type JSONValue = { [x: string]: string | boolean };

export interface JSONObject {
  [x: string]: JSONValue | string | boolean;
}

export interface ICardWord {
  id: 'string';
  group: 'string';
  page: 'string';
  word: 'string';
  image: 'string';
  audio: 'string';
  audioMeaning: 'string';
  audioExample: 'string';
  textMeaning: 'string';
  textExample: 'string';
  transcription: 'string';
  wordTranslate: 'string';
  textMeaningTranslate: 'string';
  textExampleTranslate: 'string';
}
