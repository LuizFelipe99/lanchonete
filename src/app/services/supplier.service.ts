import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'https://gym-dev.com/lanchonete/';

  constructor(private http: HttpClient) {}

  getSuppliers(
    name: string,
    responsible: string,
    type: string,
    active: number,
    nextToPage: number,
    perPage: number
  ): Promise<any> {
    const formData = {
      name: name,
      responsible: responsible,
      type: type,
      active: active,
      page: nextToPage,
      per_page: perPage,
    };

    const endPoint = `${this.apiUrl}/supplier/suppliers/`;

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
