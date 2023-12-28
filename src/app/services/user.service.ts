import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}
  // .getUsers(name, login, active, pagination, perPage)
  getUsers( user: string, login: string, active: number, nextToPage: number, perPage: number): Promise<any> {
    const formData = {
      name: user,
      login: login,
      active: active,
      page: nextToPage,
      per_page: perPage,
    };
    const endPoint = `${this.apiUrl}/user/users/`;
    return this.http
      .post(endPoint, formData)
      .toPromise()
      .then((response) => {
        // Resetar temporizador de inatividade após obter usuários

        return response as any[];
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  insertUser(
    name: string,
    login: string,
    password: string,
    active: number,
    contact: string,
    usergroup: number,
  ): Promise<any> {
    const formData = {
      name: name,
      login: login,
      password: password,
      active: active,
      contact: contact,
      usergroup: usergroup,
    };
    const endPoint = `${this.apiUrl}/user/create/`;
    return this.http
      .post(endPoint, formData)
      .toPromise()
      .then((response) => {
        // Resetar temporizador de inatividade após obter usuários

        return response as any[];
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  getUserById( id_user: string): Promise<any> {
    const formData = {
      id_user: id_user,
    };
    const endPoint = `${this.apiUrl}/user/users/`;
    return this.http
      .post(endPoint, formData)
      .toPromise()
      .then((response) => {
        return response as any[];
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
