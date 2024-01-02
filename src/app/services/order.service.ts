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

  // detalhes do pedido
  getDetailOrder( id_order_supplier: string, nextToPage: number, perPage: number): Promise<any> {
    const formData = {
      id_order_supplier: id_order_supplier,
      page: nextToPage,
      per_page: perPage,
    };
    const endPoint = `${this.apiUrl}order_supplier/detail/`;
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


    // criando pedido vazio
    createOrder( id_supplier: string, total: string, created_by: string, dt_expired: string): 
    Promise<any> {
      const formData = {id_supplier: id_supplier, total: total, created_by: created_by, dt_expired: dt_expired};
      const endPoint = `${this.apiUrl}/order_supplier/create/`;
      return this.http.post(endPoint, formData).toPromise()
      .then((response) => {return response as any[]})
      .catch((error) => {
      return Promise.reject(error)});
    }

}
