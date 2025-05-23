import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from '../models/User/user.model';
import { Observable } from 'rxjs';
import { ResponseFilterUsers } from '../models/User/responseFilterUser';
import { BASE_URL } from "./api_connector";

@Injectable({
  providedIn: 'root',
})


export class UserService {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }


  // private apiUrl = 'https://gym-dev.com/lanchonete/';
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) {}

  // função para criar usuario
  // aqui eu usei o " User " pois mandei na requisição todos os campos da model USER
  insertUser(newOrder: User): Observable<User> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}user/create/`;
    return this.http.post<User>(endPoint, newOrder, {headers});
  }

  // função para listar todos os usuarios e enviar filtros caso tenha
  // aqui eu usei o " responseFilterUser" para armazenar a resposta da api
  public getUsers(filter?: any, page?: number): Observable<ResponseFilterUsers>{
    const token = this.tokenId;
        // Configurar o cabeçalho da requisição
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    const endPoint = `${this.apiUrl}/user/users/`;
    filter.page = page;
    return this.http.post<ResponseFilterUsers>(endPoint, filter, {headers});
  }

  // função que pega o usuario pelo id
  public getUserById(id_user?: any): Observable<ResponseFilterUsers>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/user/users/`;
    return this.http.post<ResponseFilterUsers>(endPoint, id_user, {headers});
  }

// função que atualiza usuario
  updateUser(editUser: User, id_user: string): Observable<User> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}user/update/`;
    editUser.id_user = id_user;
    return this.http.post<User>(endPoint, editUser, {headers});
  }
}
