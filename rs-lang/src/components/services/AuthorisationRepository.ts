import { storage } from '../storage/localstorage';

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
}
export const authorisation = new AuthorisationRepository();
