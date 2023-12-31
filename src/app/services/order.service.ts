import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderSupplier, ResponseFilterOrder } from '../models/Order/order_supplier.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}
  // função para criar um novo pedido
  createOrder(newOrder: OrderSupplier): Observable<OrderSupplier> {
    const endPoint = `${this.apiUrl}order_supplier/create/`;
    return this.http.post<OrderSupplier>(endPoint, newOrder);
  }

// função para listar todos pedidos CASO HAJA ITENS ADICIONADOS
  public getOrders(filter?: any, page?: number): Observable<ResponseFilterOrder>{
    const endPoint = `${this.apiUrl}/order_supplier/orders/`;
    filter.page = page;
    return this.http.post<ResponseFilterOrder>(endPoint, filter);
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

}
