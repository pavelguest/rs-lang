import { state } from '../storage/state';

class WorldsRepository {
  baseUrl: string = 'https://rsslang.herokuapp.com';
  words: string = `${this.baseUrl}/words`;

  async all(page: number = 0, group: number = 0) {
    const res = await (
      await fetch(`${this.words}?page=${page}&group=${group}`)
    ).json();
    console.log(res);
    state.wordsArr = res;
    return res;
  }
  async get(id: number) {
    const res = await (await fetch(`${this.words}/${id}`)).json();
    console.log(res);
    return res;
  }
}

export const worldsRepository = new WorldsRepository();
