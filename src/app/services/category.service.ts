import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseFilterCategories } from "../models/Category/responseFilterCategory";
import { Category } from "../models/Category/category.models";
import { BASE_URL } from "./api_connector";


@Injectable({
  providedIn:'root',
})

export class CategoryService {
  get tokenId(): string {
    return localStorage.getItem('token') || ''; // Obter o nome do usuário do localStorage
  }

  // private apiUrl = 'https://gym-dev.com/lanchonete';
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) {}

  // função para listar todos as categorias e enviar filtros caso tenha
  // aqui eu usei o " responseFilterCategory" para armazenar a resposta da api
  public getCategories(filter?: any, page?: number):Observable<ResponseFilterCategories> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/category/categories/`;
    filter.page = page;
    return this.http.post<ResponseFilterCategories>(endPoint, filter, {headers})
  }

  // função que pega a categoria pelo id
  public getCategoryById(id_category?: any):Observable<ResponseFilterCategories> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/category/categories/`;
    return this.http.post<ResponseFilterCategories>(endPoint, id_category, {headers})
  }

  // função para criar categoria
  // aqui eu usei o " Category " pois mandei na requisição todos os campos da model CATEGORY
  insertCategory(newOrder: Category):Observable<Category>{
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/category/create/`;
    return this.http.post<Category>(endPoint, newOrder, {headers});
  }

  // função que atualiza a categoria
  updateCategory(editCategory: Category, id_category: string):Observable<Category> {
    const token = this.tokenId;
    // Configurar o cabeçalho da requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const endPoint = `${this.apiUrl}/category/update/`;
    editCategory.id_category = id_category;
    return this.http.post<Category>(endPoint, editCategory, {headers});
  }

    // função que pega o produto pelo id
    public getCategoryName(): Observable<ResponseFilterCategories>{
      const token = this.tokenId;
      // Configurar o cabeçalho da requisição
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const endPoint = `${this.apiUrl}/category/category_name/`;
      return this.http.post<ResponseFilterCategories>(endPoint, '', {headers});
    }
}
