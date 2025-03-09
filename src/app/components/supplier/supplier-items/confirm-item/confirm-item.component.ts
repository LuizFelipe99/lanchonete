import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Item, ItemFilter, ItemInOrder } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

@Component({
  selector: 'app-confirm-item',
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss']
})
export class ConfirmItemComponent {
  // pegando identity pelo localstorage que vai ser refrenciado com o id_item
  get identity(): string {
    return localStorage.getItem('identifier') || '';
  }

   // pegando o id da order cadastrada
   get id_order_supplier(): string {
    return localStorage.getItem('id_order_supplier') || '0'; // Obter o nome do usuário do localStorage
  }

  constructor(private api: ItemSupplierService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>){}

  ngOnInit(): void {
    this.getItemById();
  }

  id_item = this.identity;
  items: Item[];
  filterItem: ItemFilter = {id_item: this.identity};
  newItem: ItemInOrder = { id_order_supplier: this.id_order_supplier,  name: '', id_item: '', price_unit: 0, quantity: 0, total: 0};
  isLoad: boolean = false;

  // pegando o item pelo id e jogando para a função que tras somente 1
  getItemById() {
    this.isLoad = true;
    this.api.getItemById(this.filterItem).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.items = data.data;
        this.newItem.name = this.items[0].name;
        this.newItem.id_item = this.items[0].id_item;
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(data);
    })
  }

  // função que adiciona o item na order criada
  insertItemOrder(){
    this.calculateTotal();
    console.log(this.newItem);
    this.api.insertItemInOrder(this.newItem).subscribe(data => {
      if('error' in data){
        this.globalService.openSnackBar('Não foi possivel adicionar o item', 'OK', 'Erro!', 'error-snackbar');
      }else{
        this.globalService.openSnackBar('Item adicionado com sucesso', 'OK', 'Sucesso!', 'success-snackbar');
      }
      this.globalService.veryTokenExpired(data);
    })
  }


  calculateTotal(){
    this.newItem.total = ((this.newItem.quantity as number) * (this.newItem.price_unit as number ));
    
  }
}
