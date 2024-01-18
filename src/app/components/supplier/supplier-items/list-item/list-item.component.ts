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

  //pegando o valor de itendifier que esta na localstorage para usar para a verificação do botao de add item ao pedido
  get identity(): string {
    return localStorage.getItem('identifier') || '0'; // Obter o nome do usuário do localStorage
  }




  constructor(private api: ItemSupplierService, public globalService: GlobalService){}

  items: Item[];
  filterItem: ItemFilter = {name: '', description: '', category: '', quantity: 0, per_page: 15};

  page: number =1;
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  // variavel utilizada para exibir condifionalmente o botao de add item
  addItemButton = false;

  ngOnInit(): void{
    this.getItems(this.page);
    this.setAddItem();
  }

//  função responsoavel por controlar a visibilidade o botao de adicionar item ao pedido
  setAddItem(){
    if (this.identity == '1'){
      this.addItemButton = true;
    }else{
      this.addItemButton = false;
    }
    localStorage.removeItem('identifier');
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
