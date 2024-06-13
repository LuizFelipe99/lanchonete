import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogFormDetailsComponent } from '../../shared/dialog-form-details/dialog-form-details.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category, CategoryFilter } from 'src/app/models/Category/category.models';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  ngOnInit(): void {
    this.getCategoryById();
  }

  get identity(): string {
    return localStorage.getItem('identifier') || '';
  }

  constructor(private api: CategoryService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>){}

  categories: Category[];
  filterCategory: CategoryFilter = {id_category: this.identity};
  newCategory: Category = {name: '', description: ''};
  isLoad: boolean = false;

  getCategoryById() {
    this.isLoad = true;
    this.api.getCategoryById(this.filterCategory).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.categories = data.data;
        this.newCategory.name = this.categories[0].name;
        this.newCategory.description = this.categories[0].description;
        this.isLoad = false;
      }
    })
  }

  updateCategory() {
    console.log(this.newCategory);
    this.isLoad = true;
    this.api.updateCategory(this.newCategory, this.identity).subscribe(createCategory => {
      if ('error' in createCategory) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
