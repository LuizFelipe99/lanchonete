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

  // função para listar todos as categorias e enviar filtros caso tenha
  // aqui eu usei o " responseFilterCategory" para armazenar a resposta da api
  public getCategories(filter?: any, page?: number):Observable<ResponseFilterCategories> {
    const endPoint = `${this.apiUrl}/category/categories/`;
    filter.page = page;
    return this.http.post<ResponseFilterCategories>(endPoint, filter)
  }

  // função que pega a categoria pelo id
  public getCategoryById(id_category?: any):Observable<ResponseFilterCategories> {
    const endPoint = `${this.apiUrl}/category/categories/`;
    return this.http.post<ResponseFilterCategories>(endPoint, id_category)
  }

  // função para criar categoria
  // aqui eu usei o " Category " pois mandei na requisição todos os campos da model CATEGORY
  insertCategory(newOrder: Category):Observable<Category>{
    const endPoint = `${this.apiUrl}/category/create/`;
    return this.http.post<Category>(endPoint, newOrder);
  }

  // função que atualiza a categoria
  updateCategory(editCategory: Category, id_category: string):Observable<Category> {
    const endPoint = `${this.apiUrl}/category/update/`;
    editCategory.id_category = id_category;
    return this.http.post<Category>(endPoint, editCategory);
  }
}
