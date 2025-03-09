import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Category } from 'src/app/models/Category/category.models';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  isLoad: boolean = false;

  categories: Category[] = [];
  newCategory: Category = {name: '', description: ''}

  constructor(private api: CategoryService, private globalService: GlobalService){}

  insertCategory(): void {
    this.isLoad === true;
    this.api.insertCategory(this.newCategory).subscribe(createCategory => {
      if ('error' in createCategory) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(createCategory);
      this.clearInputs();
    })
  }

  clearInputs(){
    this.newCategory.name = "";
    this.newCategory.description = "";
  }

}
