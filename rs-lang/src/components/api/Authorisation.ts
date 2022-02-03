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
        (document.querySelector('.create-error') as HTMLElement).innerHTML =
          'User already exists';
        console.error('Пользователь уже существует');
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
      (document.querySelector('.login-error') as HTMLElement).innerHTML =
        "User doesn't exist";
      console.error('Пользователь не найден');
    } else if (response.status === 403) {
      (document.querySelector('.login-error') as HTMLElement).innerHTML =
        'Wrong password';
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
