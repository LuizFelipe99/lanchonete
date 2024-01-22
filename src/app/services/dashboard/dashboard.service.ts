import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsCategoryDashboard } from 'src/app/models/Dashboard/items-category.model';
import { OrderSupplierStatus } from 'src/app/models/Dashboard/oder-supplier-status.model';
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

  public getItemCategory(): Observable<ItemsCategoryDashboard>{
    const endPoint = `${this.apiUrl}/dashboard/items-category/`;
    return this.http.post<ItemsCategoryDashboard>(endPoint, '');
  }

  public getStatusOrders(): Observable<OrderSupplierStatus>{
    const endPoint = `${this.apiUrl}/dashboard/order-status/`;
    return this.http.post<OrderSupplierStatus>(endPoint, '');
  }
 
}
