import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseFilterItems } from "../models/Item-Supplier/responseFilterItem";
import { Item, ItemInOrder } from "../models/Item-Supplier/item.models";

@Injectable({
  providedIn:'root',
})

export class ItemSupplierService {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }

  private apiUrl = 'https://gym-dev.com/lanchonete';

  constructor(private http: HttpClient) {}

  // função para listar todos os itens e enviar filtros caso tenha
  // aqui eu usei o " responseFilterItem" para armazenar a resposta da api
  public getItems(filter?: any, page?: number): Observable<ResponseFilterItems> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/item/items/`;
    filter.page = page;
    return this.http.post<ResponseFilterItems>(endPoint, filter, {headers})
  }

  // função que pega o produto pelo id
  public getItemById(id_item?: any): Observable<ResponseFilterItems>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/item/items/`;
    return this.http.post<ResponseFilterItems>(endPoint, id_item, {headers});
  }

  // função para criar produto
  // aqui eu usei o " Product " pois mandei na requisição todos os campos da model PRODUCT
  insertItem(newOrder: Item):Observable<Item>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/item/create/`;
    return this.http.post<Item>(endPoint, newOrder, {headers});
  }

  // função para atualizar o produto
  updateItem(editItem: Item, id_item: string):Observable<Item> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/item/update/`;
    editItem.id_item = id_item;
    return this.http.post<Item>(endPoint, editItem, {headers});
  }

  public getItemName(filter?: any): Observable<ResponseFilterItems> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/item/item_names`
    return this.http.post<ResponseFilterItems>(endPoint, filter, {headers})
  }

  getItemNames(): Promise<any> {
    const formData = {};
    const endPoint = `${this.apiUrl}/item/item_names/`;
    return this.http.post(endPoint, formData).toPromise().then((response) => {
      
      return response as any[];
    }).catch((error) => {
      return Promise.reject(error);
    })
  }

  insertItemInOrder(insertItens: ItemInOrder): Observable<ItemInOrder>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/order_supplier/insert_item/`;
    return this.http.post<ItemInOrder>(endPoint, insertItens, {headers});
  }

 // função que pega o produto pelo id
 public removeItemOrder(removeItens: ItemInOrder): Observable<ItemInOrder>{
  const token = this.tokenId;
  // Configurar o cabeçalho da requisição
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  const endPoint = `${this.apiUrl}/order_supplier/remove_item/`;
  return this.http.post<ItemInOrder>(endPoint, removeItens, {headers});
}


}
