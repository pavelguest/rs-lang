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
        console.log('Пользователь уже существует');
      } else {
        const userResponse = await response.json();
        let { id, name, email } = userResponse;
        storage.idUser = id;
        storage.name = name;
        storage.email = email;
        storage.save();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
let authorisation = new Authorisation();
authorisation.createUser('Korol Lev6', 'hello7@user.com', 'Gfh1jkm_123');
