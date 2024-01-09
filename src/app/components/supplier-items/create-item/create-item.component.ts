import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Item } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  isLoad: boolean = false;
  items: Item[] = [];
  newItem: Item = {name: '', description: '', category: ''}

  constructor(private api: ItemSupplierService, private globalService: GlobalService) {}

  insertItem(): void {
    this.isLoad === true;
    this.api.insertItem(this.newItem).subscribe(CreateItem => {
      if('error' in CreateItem) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Eroo!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Registro criado com, sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    })
  }

}
