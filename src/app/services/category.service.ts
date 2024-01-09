import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseFilterCategories } from "../models/Category/responseFilterCategory";
import { Category } from "../models/Category/category.models";


@Injectable({
  providedIn:'root',
})

export class CategoryService {
  private apiUrl = 'https://gym-dev.com/lanchonete';

  constructor(private http: HttpClient) {}

  public getCategories(filter?: any, page?: number):Observable<ResponseFilterCategories> {
    const endPoint = `${this.apiUrl}/category/categories/`;
    filter.page = page;
    return this.http.post<ResponseFilterCategories>(endPoint, filter)
  }

  insertCategory(newOrder: Category):Observable<Category>{
    const endPoint = `${this.apiUrl}/category/create/`;
    return this.http.post<Category>(endPoint, newOrder);
  }
}
