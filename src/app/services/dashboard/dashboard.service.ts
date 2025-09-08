import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { financeDashModel, financeDetailDashModel } from 'src/app/models/Dashboard/finance.model';
import { ItemsCategoryDashboard } from 'src/app/models/Dashboard/items-category.model';
import { OrderSupplierStatus } from 'src/app/models/Dashboard/oder-supplier-status.model';
import { UserStatsDashboard } from 'src/app/models/Dashboard/users-status.model';
import { BASE_URL } from '../api_connector';
import { itemRank } from 'src/app/models/Dashboard/rank-item.model';

@Injectable({
  providedIn: 'root',
})

export class DashBoard {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }


  // private apiUrl = 'https://gym-dev.com/lanchonete/';
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) { }


  // função para listar todos os usuarios e enviar filtros caso tenha
  // aqui eu usei o " responseFilterUser" para armazenar a resposta da api
  public getUserStats(): Observable<UserStatsDashboard> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/users/status/`;
    return this.http.post<UserStatsDashboard>(endPoint, '', { headers });
  }

  public getItemCategory(): Observable<ItemsCategoryDashboard> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/items-category/`;
    return this.http.post<ItemsCategoryDashboard>(endPoint, '', { headers });
  }

  public getStatusOrders(): Observable<OrderSupplierStatus> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/order-status/`;
    return this.http.post<OrderSupplierStatus>(endPoint, '', { headers });
  }

  public getFinanceDash(): Observable<financeDashModel> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/finance/total_month/`;
    return this.http.post<financeDashModel>(endPoint, '', { headers });
  }

  public getFinanceDetailDash(): Observable<financeDetailDashModel> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/finance/total_month_detail/`;
    return this.http.post<financeDetailDashModel>(endPoint, '', { headers });
  }

  public getRankItems(): Observable<itemRank> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/dashboard/rank_snacks/`;
    return this.http.get<itemRank>(endPoint, { headers });
  }
}
