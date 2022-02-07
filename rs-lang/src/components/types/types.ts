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
  wordsArr: IWords[];
}

export interface ILocalStorage {
  idUser: string;
  name: string;
  token: string;
  refreshToken: string;
  isAuthorised: boolean;
  tokenDateExpiration: number;
}

type JSONValue = { [x: string]: string };

export interface JSONObject {
  [x: string]: JSONValue;
}
