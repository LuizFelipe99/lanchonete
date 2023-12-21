import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}

  getUsers(
    user: string,
    login: string,
    active: number,
    nextToPage: number,
    per_page: number
  ): Promise<any> {
    const formData = {
      name: user,
      login: login,
      active: active,
      page: nextToPage,
      per_page: per_page,
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



}