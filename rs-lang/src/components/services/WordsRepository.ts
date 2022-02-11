import { storage } from '../storage/localstorage';
import { state } from '../storage/state';
import { authorisation } from './AuthorisationRepository';
import { IWords } from '../types/types';

class WordsRepository {
  baseUrl: string = 'https://rsslang.herokuapp.com';
  words: string = `${this.baseUrl}/words`;

  async all(page: number = 0, group: number = 0) {
    const res = await (
      await fetch(`${this.words}?page=${page}&group=${group}`)
    ).json();
    return res;
  }
  async get(id: number) {
    const res = await (await fetch(`${this.words}/${id}`)).json();
    console.log(res);
    return res;
  }
  async allWordsAuthorised(page: string, group: string) {
    const res = await authorisation.fetchWithRefreshingToken(
      `${this.baseUrl}/users/${storage.idUser}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  }
}

export const worldsRepository = new WordsRepository();
