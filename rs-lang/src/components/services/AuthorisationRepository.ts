import { storage } from '../storage/localstorage';
import { IWords, JSONObject } from '../types/types';
import { constants } from '../helpers/constansts';
import { worldsRepository } from './WordsRepository';
import { startingLoginButton } from '../buttons/startingLoginButtons';

class AuthorisationRepository {
  private baseUrl: string = 'https://rsslang.herokuapp.com';
  private usersUrl: string = `${this.baseUrl}/users`;

  async createUser(name: string, email: string, password: string) {
    return fetch(`${this.usersUrl}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }
  async login(email: string, password: string) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }
  logout() {
    storage.logout();
  }
  async fetchWithRefreshingToken(url: string, options: JSONObject) {
    if (Date.now() < storage.tokenExpirationDate) {
      return fetch(url, options);
    }
    try {
      const response = await fetch(
        `${this.usersUrl}/${storage.idUser}/tokens`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storage.refreshToken}`,
          },
        }
      );
      const { token, refreshToken } = await response.json();
      storage.token = token;
      storage.refreshToken = refreshToken;
      storage.tokenExpirationDate = Date.now() + constants.TOKEN_EXPIRE_TIME;
      storage.save();
    } catch (error) {
      startingLoginButton.logout();
    }
    return fetch(url, options);
  }
}
export const authorisation = new AuthorisationRepository();
