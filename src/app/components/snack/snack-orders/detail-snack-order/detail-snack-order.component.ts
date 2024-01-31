import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Item, ItemFilter } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { OrderSnackService } from 'src/app/services/order-snack.service';

@Component({
  selector: 'app-detail-snack-order',
  templateUrl: './detail-snack-order.component.html',
  styleUrls: ['./detail-snack-order.component.scss']
})
export class DetailSnackOrderComponent {
 //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
 get identity(): string {
  return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
}
// metodo construtor
constructor(private api: OrderSnackService, private item: ItemSupplierService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {}

ngOnInit(): void {
  this.getDetailOrder(this.pagination);
  this.getItems(1);
}

items: Item[];
filterItem: ItemFilter = {name: '', description: '', category: '', current_stock: 0, per_page: 15};

detailOder: any[] = [];
totalOrders: number = 0;
totalPages: number = 0;
totalItems: number = 0;
currentPage: number = 1;
pagination: number = 1;
perPage: number = 15;
isLoad: boolean = false;

client: string = '';

total: number = 0;
pedido: string = '';
addItem = false;
status = '';
payment_type = '';

  getDetailOrder(pagination: number) {
    this.isLoad = true; // variavel que controla o simbolo de loading
    this.api.getDetailOrder(this.identity, pagination, this.perPage).then((response) => {
      if (response.status === true) {
      this.detailOder = response.data; 
      this.totalPages = response.total_pages;
      this.currentPage = response.current_page;
      this.client = response.data[0].client;
      this.pedido = response.data[0].id_order_snack;
      this.status = response.data[0].status;
      this.payment_type = response.data[0].payment_type;
      this.isLoad = false;
      // bloco responsavel por fazer a soma entre os subtotais, para nao precisar criar outra chamada para api
      this.total = this.sumSubTotal();
      // fim do bloco de somar valores
      // colocando na localstorage o id_order para adicionar mais itens
      localStorage.setItem('id_order_snack', this.identity);
      this.verifyMoreItem();
      }else{
        // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
    }

    
    },
    (error: any) => {
      this.isLoad = false;
      console.error('Erro ao buscar pedidos:', error);
    })
  }

  sumSubTotal(): number {
    return this.detailOder.reduce((acumulador, objeto) => acumulador + objeto.total, 0);
    // console.log(acumulador);
  }

  // essa função verifica se o status do pedido é = a concluido, caso seha, o botao de add mais itens desaparece
  verifyMoreItem(){
    if (this.status == 'Concluído' ) {
      this.addItem = false;
    }else{
      this.addItem = true;
    }
  }



  getItems(page: number) {
    this.isLoad = true;
    this.item.getItems(this.filterItem, page).subscribe(data => {
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
