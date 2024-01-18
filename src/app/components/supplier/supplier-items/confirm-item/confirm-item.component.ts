import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Item, ItemFilter } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

@Component({
  selector: 'app-confirm-item',
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss']
})
export class ConfirmItemComponent {
  get identity(): string {
    return localStorage.getItem('identifier') || '';
  }

  constructor(private api: ItemSupplierService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>){}

  ngOnInit(): void {
    this.getItemById();
  }

id_item = this.identity;
items: Item[];
filterItem: ItemFilter = {id_item: this.identity};
newItem: Item = {name: '', id_item: ''};
isLoad: boolean = false;

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
}
