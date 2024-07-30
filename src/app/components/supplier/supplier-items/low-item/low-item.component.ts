import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { lowItemStock } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';


@Component({
  selector: 'app-low-item',
  templateUrl: './low-item.component.html',
  styleUrls: ['./low-item.component.scss']
})
export class LowItemComponent {
  isLoad = false;


  constructor(private api: ItemSupplierService, private globalService: GlobalService){}
  lowItem: lowItemStock = {id_item: '', qte_remove: ''}


  lowItemStock(): void {
    this.isLoad = true;
    this.api.lowItemToStock(this.lowItem).subscribe(data => {
      if('error' in data) {
        this.globalService.openSnackBar(data.message, 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.globalService.openSnackBar(data.message, 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(data);
    })
  }


}
