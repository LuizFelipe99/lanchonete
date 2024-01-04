import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from '../models/User/user.model';
import { Observable } from 'rxjs';
import { ResponseFilterUsers } from '../models/User/resopnseFilterUser';


@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}

  // função para listar todos os usuarios e enviar filtros caso tenha
  // aqui eu usei o " responseFilterUser" para armazenar a resposta da api
  public getUsers(filter?: any, page?: number): Observable<ResponseFilterUsers>{
    const endPoint = `${this.apiUrl}/user/users/`;
    filter.page = page;
    return this.http.post<ResponseFilterUsers>(endPoint, filter);
  }
  

  // função para criar usuario
  // aqui eu usei o " User " pois mandei na requisição todos os campos da model USER
  insertUser(newOrder: User): Observable<User> {
    const endPoint = `${this.apiUrl}user/create/`;
    return this.http.post<User>(endPoint, newOrder);
  }


  public getUserById(id_user?: any): Observable<ResponseFilterUsers>{
    const endPoint = `${this.apiUrl}/user/users/`;
    return this.http.post<ResponseFilterUsers>(endPoint, id_user);
  }

  getUserByIdd( id_user: string): Promise<any> {
    const formData = {id_user: id_user};
    const endPoint = `${this.apiUrl}/user/users/`;
    return this.http.post(endPoint, formData).toPromise().then((response) => {return response as any[]}).catch((error) => {
        return Promise.reject(error);
      });
  }

  updateUser(editUser: User, id_user: string): Observable<User> {
    const endPoint = `${this.apiUrl}user/update/`;
    editUser.id_user = id_user;
    return this.http.post<User>(endPoint, editUser);
  }

  updateUserr(id_user: string, name: string, login: string, password: string, active: number, contact: string, usergroup: number, ): Promise<any> {
    const formData = {id_user: id_user, name: name, login: login, password: password, active: active, contact: contact, usergroup: usergroup, };
    const endPoint = `${this.apiUrl}/user/update/`;
    return this.http.post(endPoint, formData).toPromise().then((response) => {return response as any[];}).catch((error) => {return Promise.reject(error)})
  }

}
