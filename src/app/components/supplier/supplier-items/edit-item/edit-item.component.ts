import { CategoryService } from '../../../../services/category.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { DialogFormDetailsComponent } from '../../../shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Item } from 'src/app/models/Item-Supplier/item.models';
import { ItemFilter } from 'src/app/models/Item-Supplier/item.models';
import { Category } from 'src/app/models/Category/category.models';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  ngOnInit(): void {
    this.getItemById();
     this.getCategoryName();
  }

  get identity(): string {
    return localStorage.getItem('identifier') || '';
  }

  constructor(private api: ItemSupplierService, private category: CategoryService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>){}

  items: Item[];
  filterItem: ItemFilter = {id_item: this.identity};
  newItem: Item = {name: '', description: '', category: ''};
  isLoad: boolean = false;

  category_names: Category[];

  getCategoryName() {
    this.isLoad = true;
    this.category.getCategoryName().subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.category_names = data.data;
        console.log('getCategoryName',this.newItem.category);
        }
      }
    );
  }


  getItemById() {
    this.isLoad = true;
    this.api.getItemById(this.filterItem).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.items = data.data;
        this.newItem.name = this.items[0].name;
        this.newItem.description = this.items[0].description;
        this.newItem.category = this.items[0].category;
        console.log('new item name ', this.newItem.category);
        this.isLoad = false;
      }
    })
  }

  updateItem() {
    console.log(this.newItem);
    this.isLoad = true;
    this.api.updateItem(this.newItem, this.identity).subscribe(createItem => {
      if ('error' in createItem) {
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
