import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStatsDashboard } from 'src/app/models/Dashboard/users-status.model';


@Injectable({
  providedIn: 'root',
})

export class DashBoard {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}


  // função para listar todos os usuarios e enviar filtros caso tenha
  // aqui eu usei o " responseFilterUser" para armazenar a resposta da api
  public getUserStats(): Observable<UserStatsDashboard>{
    const endPoint = `${this.apiUrl}/dashboard/users/status/`;
    return this.http.post<UserStatsDashboard>(endPoint, '');
  }

 
}
