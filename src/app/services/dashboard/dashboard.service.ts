import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // + HttpParams
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { financeDashModel, financeDetailDashModel } from 'src/app/models/Dashboard/finance.model';
import { ItemsCategoryDashboard } from 'src/app/models/Dashboard/items-category.model';
import { OrderSupplierStatus } from 'src/app/models/Dashboard/oder-supplier-status.model';
import { UserStatsDashboard } from 'src/app/models/Dashboard/users-status.model';
import { BASE_URL } from '../api_connector';
import { itemRank } from 'src/app/models/Dashboard/rank-item.model';
import { UserFilter, usersAccess } from 'src/app/models/Dashboard/users-access.model'; // + UserFilter

@Injectable({
  providedIn: 'root',
})
export class DashBoard {
  get tokenId(): string {
    return localStorage.getItem('token') || '';
  }

  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) {}

  // --- DASHBOARD ---

  public getUserStats(): Observable<UserStatsDashboard> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/users/status/`;
    return this.http.post<UserStatsDashboard>(endPoint, '', { headers });
  }

  public getItemCategory(): Observable<ItemsCategoryDashboard> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/items-category/`;
    return this.http.post<ItemsCategoryDashboard>(endPoint, '', { headers });
  }

  public getStatusOrders(): Observable<OrderSupplierStatus> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/order-status/`;
    return this.http.post<OrderSupplierStatus>(endPoint, '', { headers });
  }

  public getFinanceDash(): Observable<financeDashModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/finance/total_month/`;
    return this.http.post<financeDashModel>(endPoint, '', { headers });
  }

  public getFinanceDetailDash(): Observable<financeDetailDashModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/finance/total_month_detail/`;
    return this.http.post<financeDetailDashModel>(endPoint, '', { headers });
  }

  public getRankItems(): Observable<itemRank> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/rank_snacks/`;
    return this.http.get<itemRank>(endPoint, { headers });
  }

  // --- USERS ACCESS (lista + export) ---

  public getUsersAccess(filter?: any, page?: number): Observable<usersAccess> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/users-access/`;
    filter.page = page;
    return this.http.post<usersAccess>(endPoint, filter, { headers });
  }

  /** Exporta CSV (GET) — envia os MESMOS filtros via query string e retorna Blob */
  public exportUsersAccess(filters: UserFilter): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenId}`
      // (intencionalmente sem Content-Type em GET)
    });

    const params = new HttpParams({
      fromObject: {
        name: filters?.name || '',
        login: filters?.login || '',
        dt_login_de: (filters as any)?.dt_login_de || '',
        dt_logou_ate: (filters as any)?.dt_logou_ate || '',
        request: (filters?.request ?? '').toString(),
        ip: filters?.ip || '',
        user_status: (filters?.user_status ?? '').toString(),
      }
    });

    // ajuste o caminho conforme onde salvou seu export.php
    const endPoint = `${this.apiUrl}/dashboard/export/users-access/`;
    return this.http.get(endPoint, { headers, params, responseType: 'blob' });
  }

  /** (Opcional) versão POST se preferir enviar JSON no body */
  public exportUsersAccessPost(filters: UserFilter): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenId}`
    });
    const endPoint = `${this.apiUrl}/dashboard/export/users-access/`;
    return this.http.post(endPoint, filters, { headers, responseType: 'blob' });
  }
}
