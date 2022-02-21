import { ILocalStorage } from '../types/types';
class LocalStorage {
  idUser?: string;
  name?: string;
  token?: string;
  refreshToken?: string;
  isAuthorised: boolean;
  tokenExpirationDate: number;
  constructor(localStorageData: ILocalStorage) {
    this.idUser = localStorageData?.idUser ?? null;
    this.name = localStorageData?.name ?? null;
    this.token = localStorageData?.token ?? null;
    this.refreshToken = localStorageData?.refreshToken ?? null;
    this.isAuthorised = localStorageData?.isAuthorised ?? false;
    this.tokenExpirationDate = localStorageData.tokenExpirationDate ?? 0;
  }
  save() {
    localStorage.setItem('rsLangTeam26', JSON.stringify(this));
  }
  logout() {
    delete this.idUser;
    delete this.name;
    delete this.token;
    delete this.refreshToken;
    this.tokenExpirationDate = 0;
    this.isAuthorised = false;
    this.save();
  }
}
export const storage = new LocalStorage(
  JSON.parse(localStorage.getItem('rsLangTeam26') || '{}')
);
