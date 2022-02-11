import { storage } from '../storage/localstorage';
import { authorisation } from './AuthorisationRepository';
import { JSONObject } from '../types/types';
class DifficultWordsService {
  private baseUrl: string = 'https://rsslang.herokuapp.com';
  async createDifficultWord(wordId: string, props: JSONObject) {
    const response = await authorisation.fetchWithRefreshingToken(
      `${this.baseUrl}/users/${storage.idUser}/words/${wordId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      }
    );
  }
  async getAllDifficultWords() {
    const response = await authorisation.fetchWithRefreshingToken(
      `${this.baseUrl}/users/${storage.idUser}/aggregatedWords?wordsPerPage=4000&filter={"userWord.optional.isDifficult": "true"}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    return result;
  }
}
export const difficultWordsService = new DifficultWordsService();
