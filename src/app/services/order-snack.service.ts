import { HttpClient } from "@angular/common/http";
import { OrderSnack, ResponseFilterOrderSnack } from "../models/Snack-Order/snack-order.models";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ItemInOrderSnack } from "../models/Item-Supplier/item.models";

@Injectable({
  providedIn: 'root',
})
export class OrderSnackService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}
  // função para criar um novo pedido
  createOrder(newOrder: OrderSnack): Observable<OrderSnack> {
    const endPoint = `${this.apiUrl}order_snack/create/`;
    return this.http.post<OrderSnack>(endPoint, newOrder);
  }

// função para listar todos pedidos CASO HAJA ITENS ADICIONADOS
  public getOrders(filter?: any, page?: number): Observable<ResponseFilterOrderSnack>{
    const endPoint = `${this.apiUrl}/order_snack/orders/`;
    filter.page = page;
    return this.http.post<ResponseFilterOrderSnack>(endPoint, filter);
  }


  // detalhes do pedido
  getDetailOrder( id_order_snack: string, nextToPage: number, perPage: number): Promise<any> {
    const formData = {
      id_order_snack: id_order_snack,
      page: nextToPage,
      per_page: perPage,
    };
    const endPoint = `${this.apiUrl}order_snack/detail/`;
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


  insertItemInOrder(insertItens: ItemInOrderSnack):Observable<ItemInOrderSnack>{
    const endPoint = `${this.apiUrl}/order_snack/insert_item/`;
    return this.http.post<ItemInOrderSnack>(endPoint, insertItens);
  }

}
