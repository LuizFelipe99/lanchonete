import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseFilterSnacks } from "../models/Snack/responseFilterSnack";
import { Observable } from "rxjs";
import { Snack } from "../models/Snack/snack.models";

@Injectable({
  providedIn: 'root',
})

export class SnackService {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }

  private apiUrl = 'https://gym-dev.com/lanchonete/'

  constructor(private http: HttpClient) {}

  public getSnacks(filter?: any, page?: number):
    Observable<ResponseFilterSnacks> {
      const token = this.tokenId;
      // Configurar o cabeçalho da requisição
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const endPoint = `${this.apiUrl}/snack/snacks/`;
      filter.page = page;
      return this.http.post<ResponseFilterSnacks>(endPoint, filter, {headers});
    }

  public getSnackById(id_snack?: any): Observable<ResponseFilterSnacks> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/snack/snacks/`;
    return this.http.post<ResponseFilterSnacks>(endPoint, id_snack, {headers})
  }

  public insertSnack(newOrder: Snack): Observable<Snack> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/snack/create/`;
    return this.http.post<Snack>(endPoint, newOrder, {headers});
  }

  public getSnackName(filter?: any): Observable<ResponseFilterSnacks>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/snack/snack_names`;
    return this.http.post<ResponseFilterSnacks>(endPoint, filter, {headers})
  }

  getSnackNames( ): Promise<any> {
    const formData = {
    };
    const endPoint = `${this.apiUrl}/snack/snack_names/`;
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

  updateSnack(editSnack: Snack, id_snack: string): Observable<Snack> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/snack/update/`;
    return this.http.post<Snack>(endPoint, editSnack, {headers});
  }
}
