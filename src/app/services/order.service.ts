import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}

  // .getUsers(name, login, active, pagination, perPage)
  getOrders( supplier: string, responsible: string, id_order_supplier: string, nextToPage: number, perPage: number): 
  Promise<any> {
    const formData = {supplier: supplier, responsible: responsible, id_order_supplier: id_order_supplier, page: nextToPage, per_page: perPage};
    const endPoint = `${this.apiUrl}/order_supplier/orders/`;
    return this.http.post(endPoint, formData).toPromise()
    .then((response) => {return response as any[]})
    .catch((error) => {
    return Promise.reject(error)});
  }

 

}
