import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseFilterItems } from "../models/Item-Supplier/responseFilterItem";
import { Item } from "../models/Item-Supplier/item.models";

@Injectable({
  providedIn:'root',
})

export class ItemSupplierService {
  private apiUrl = 'https://gym-dev.com/lanchonete';

  constructor(private http: HttpClient) {}

  // função para listar todos os itens e enviar filtros caso tenha
  // aqui eu usei o " responseFilterItem" para armazenar a resposta da api
  public getItems(filter?: any, page?: number): Observable<ResponseFilterItems> {
    const endPoint = `${this.apiUrl}/item/items/`;
    filter.page = page;
    return this.http.post<ResponseFilterItems>(endPoint, filter)
  }

  // função que pega o produto pelo id
  public getItemById(id_item?: any): Observable<ResponseFilterItems>{
    const endPoint = `${this.apiUrl}/item/items/`;
    return this.http.post<ResponseFilterItems>(endPoint, id_item);
  }

  // função para criar produto
  // aqui eu usei o " Product " pois mandei na requisição todos os campos da model PRODUCT
  insertItem(newOrder: Item):Observable<Item>{
    const endPoint = `${this.apiUrl}/item/create/`;
    return this.http.post<Item>(endPoint, newOrder);
  }

  // função para atualizar o produto
  updateItem(editItem: Item, id_item: string):Observable<Item> {
    const endPoint = `${this.apiUrl}/item/update/`;
    editItem.id_item = id_item;
    return this.http.post<Item>(endPoint, editItem);
  }
}
