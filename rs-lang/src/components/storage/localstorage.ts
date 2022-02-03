import { ILocalStorage } from '../types/Interfaces';
class LocalStorage {
  idUser?: string;
  name?: string;
  token?: string;
  refreshToken?: string;
  constructor(localStorageData: ILocalStorage) {
    this.idUser = localStorageData?.idUser ?? null;
    this.name = localStorageData?.name ?? null;
    this.token = localStorageData?.token ?? null;
    this.refreshToken = localStorageData?.refreshToken ?? null;
  }
  save() {
    localStorage.setItem('rsLangTeam26', JSON.stringify(this));
  }
}
export const storage = new LocalStorage(
  JSON.parse(localStorage.getItem('rsLangTeam26') || '{}')
);
