import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FinishOrder, OrderSnack, ResponseFilterOrderSnack } from "../models/Snack-Order/snack-order.models";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ItemInOrderSnack, RemoveItemInOrder } from "../models/Item-Supplier/item.models";
import { BASE_URL } from "./api_connector";

@Injectable({
  providedIn: 'root',
})
export class OrderSnackService {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }

  // private apiUrl = 'https://gym-dev.com/lanchonete/';
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) {}
  // função para criar um novo pedido
  createOrder(newOrder: OrderSnack): Observable<OrderSnack> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}order_snack/create/`;
    return this.http.post<OrderSnack>(endPoint, newOrder, {headers});
  }

// função para listar todos pedidos CASO HAJA ITENS ADICIONADOS
  public getOrders(filter?: any, page?: number): Observable<ResponseFilterOrderSnack>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/order_snack/orders/`;
    filter.page = page;
    return this.http.post<ResponseFilterOrderSnack>(endPoint, filter, {headers});
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
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/order_snack/insert_item/`;
    return this.http.post<ItemInOrderSnack>(endPoint, insertItens, {headers});
  }

  finishOrderSnack(finishOrder: FinishOrder):Observable<FinishOrder>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/order_snack/finish_order/`;
    return this.http.post<FinishOrder>(endPoint, finishOrder, {headers});
  }

  removeItemFromOrder(removeItem: RemoveItemInOrder):Observable<RemoveItemInOrder>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/order_snack/remove_item/`;
    return this.http.post<RemoveItemInOrder>(endPoint, removeItem, {headers});
  }

}
