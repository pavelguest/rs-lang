import { storage } from '../storage/localstorage';

class Authorisation {
  private baseUrl: string = 'https://rsslang.herokuapp.com';
  private usersUrl: string = `${this.baseUrl}/users`;

  async createUser(name: string, email: string, password: string) {
    try {
      const response = await fetch(`${this.usersUrl}`, {
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
      if (response.status === 417) {
        console.error('Пользователь уже существует');
      } else if (response.status === 422) {
        console.error('Неправильный пароль');
      }
    } catch (e) {
      console.log(e);
    }
  }
  async login(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/signin`, {
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
    if (response.status === 404) {
      console.error('Пользователь не найден');
    } else {
      const loginResponse = await response.json();
      console.log(loginResponse);
      storage.token = loginResponse.token;
      storage.refreshToken = loginResponse.refreshToken;
      storage.idUser = loginResponse.userId;
      storage.name = loginResponse.name;
      storage.save();
    }
  }
  logout() {
    delete storage.idUser;
    delete storage.name;
    delete storage.token;
    delete storage.refreshToken;
    storage.save();
  }
}
export const authorisation = new Authorisation();
