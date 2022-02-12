import { storage } from '../storage/localstorage';
import { authorisation } from './AuthorisationRepository';
import { JSONObject } from '../types/types';
import { state } from '../storage/state';
class DifficultWordsService {
  private baseUrl: string = 'https://rsslang.herokuapp.com';
  async createWord(wordId: string, props: JSONObject) {
    try {
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
      throw new Error(String(response.status));
    } catch (error) {
      const response = await authorisation.fetchWithRefreshingToken(
        `${this.baseUrl}/users/${storage.idUser}/words/${wordId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${storage.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(props),
        }
      );
    }
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
  async getAllLearnedWords() {
    const response = await authorisation.fetchWithRefreshingToken(
      `${this.baseUrl}/users/${storage.idUser}/aggregatedWords?wordsPerPage=4000&filter={"userWord.optional.isLearned": "true"}`,
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