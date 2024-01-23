import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseFilterSnacks } from "../models/Snack/responseFilterSnack";
import { Observable, filter } from "rxjs";
import { Snack } from "../models/Snack/snack.models";

@Injectable({
  providedIn: 'root',
})

export class SnackService {
  private apiUrl = 'https://gym-dev.com/lanchonete/snack/create/'

  constructor(private http: HttpClient) {}

  public getSnacks(filter?: any, page?: number):
    Observable<ResponseFilterSnacks> {
      const endPoint = `${this.apiUrl}/snack/snacks/`;
      filter.page = page;
      return this.http.post<ResponseFilterSnacks>(endPoint, filter);
    }

  public getSnackById(id_snack?: any): Observable<ResponseFilterSnacks> {
    const endPoint = `${this.apiUrl}/snack/snacks`;
    return this.http.post<ResponseFilterSnacks>(endPoint, id_snack)
  }

  public insertSnack(newOrder: Snack): Observable<Snack> {
    const endPoint = `${this.apiUrl}/snack/create/`;
    return this.http.post<Snack>(endPoint, newOrder);
  }

  public getSnackName(filter?: any): Observable<ResponseFilterSnacks>{
    const endPoint = `${this.apiUrl}/snack/snack_names`;
    return this.http.post<ResponseFilterSnacks>(endPoint, filter)
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
    const endPoint = `${this.apiUrl}/snack/update/`;
    return this.http.post<Snack>(endPoint, editSnack);
  }
}
