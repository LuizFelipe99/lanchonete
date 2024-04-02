import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Category, CategoryFilter } from 'src/app/models/Category/category.models';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {

  constructor(private api: CategoryService, public globalService: GlobalService) {}

  categories: Category[];
  filterCategory: CategoryFilter = {name: '', description: '', per_page: 15}

  page: number = 1;
  totalCategories: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  ngOnInit(): void {
    this.getCategories(this.page);
  }

  getCategories(page: number) {
    this.isLoad = true;
    this.api.getCategories(this.filterCategory, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.categories = data.data;
        this.totalCategories = data.categories;
        this.totalPages = data.total_pages;
        this.currentPage = data.current_page;
        this.isLoad = false;
      }
    })
  }

  clearInputs(){
    this.filterCategory.name = "";
    this.filterCategory.description = "";
  }
}
