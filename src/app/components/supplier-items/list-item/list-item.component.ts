import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Item, ItemFilter } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  constructor(private api: ItemSupplierService, public globalService: GlobalService){}

  items: Item[];
  filterItem: ItemFilter = {name: '', description: '', category: '', quantity: 0, per_page: 15};

  page: number =1;
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  ngOnInit(): void{
    this.getItems(this.page)
  }

  getItems(page: number) {
    this.isLoad = true;
    this.api.getItems(this.filterItem, page).subscribe(data => {
      if('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.items = data.data;
        this.totalPages = data.total_pages;
        this.currentPage = data.current_page;
        this.totalItems = data.items;
        this.isLoad =  false;
      }
    });
  }

}
