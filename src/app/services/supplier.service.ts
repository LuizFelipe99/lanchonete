import { ResponseFilterSuppliers } from './../models/Supplier/responseFilterSupplier';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/Supplier/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}

  // função para listar todos os fornecedores e enviar filtros caso tenha
  // aqui eu usei o " responseFilterSupplier" para armazenar a resposta da api
  public getSuppliers(filter?: any, page?: number): Observable<ResponseFilterSuppliers> {
    const endPoint = `${this.apiUrl}/supplier/suppliers/`;
    filter.page = page;
    return this.http.post<ResponseFilterSuppliers>(endPoint, filter);
  }

  // função para criar fornecedor
  // aqui eu usei o " Supplier " pois mandei na requisição todos os campos da model SUPPLIER
  public insertSupplier(newOrder: Supplier): Observable<Supplier> {
    const endPoint = `${this.apiUrl}/supplier/create/`;
    return this.http.post<Supplier>(endPoint, newOrder);
  }

  // função que pega o fornecedor pelo id
  public getSupplierById( id_supplier?: any): Observable<ResponseFilterSuppliers> {
    const endPoint = `${this.apiUrl}/supplier/suppliers/`;
    return this.http.post<ResponseFilterSuppliers>(endPoint, id_supplier)
  }

  public getSupplierName(filter?: any): Observable<ResponseFilterSuppliers>{
    const endPoint = `${this.apiUrl}/supplier/supplier_names`;
    return this.http.post<ResponseFilterSuppliers>(endPoint, filter)
  }

  getSupplierNames( ): Promise<any> {
    const formData = {
    };
    const endPoint = `${this.apiUrl}/supplier/supplier_names/`;
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

  // função que atualiza o fornecedor
  updateSupplier(editSupplier: Supplier, id_supplier: string): Observable<Supplier> {
    const endPoint = `${this.apiUrl}/supplier/update/`;
    return this.http.post<Supplier>(endPoint, editSupplier);
  }

}
