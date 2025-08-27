import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Item, ItemFilter, ItemInOrder, ItemInOrderSnack, RemoveItemInOrder } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { OrderSnackService } from 'src/app/services/order-snack.service';
import { BASE_URL } from 'src/app/services/api_connector';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

base_url_img = BASE_URL;

searchQuery: string = '';
searchSubject = new Subject<string>(); // Subject para debounce da busca
// metodo construtor
constructor(private api: OrderSnackService, private item: ItemSupplierService,  public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {}

ngOnInit(): void {
  this.getDetailOrder(this.pagination);
  this.getItems(1);


    // Configura o debounce para evitar chamadas excessivas à API
    this.searchSubject.pipe(
      debounceTime(500), // Aguarda 500ms antes de fazer a requisição
      distinctUntilChanged() // Só dispara se o valor mudar
    ).subscribe(searchText => {
      this.filterItem.name = searchText;
      this.getItems(1); // Buscar os itens na API
    });
}

items: Item[];
filterItem: ItemFilter = {name: '', description: '', category: '', current_stock: 0, per_page: 100};

detailOder: any[] = [];
totalOrders: number = 0;
totalPages: number = 0;
totalItems: number = 0;
currentPage: number = 1;
pagination: number = 1;
perPage: number = 100;
isLoad: boolean = false;

client: string = '';

total: number = 0;
pedido: string = '';
addItem = false;
status = '';
payment_type = '';
service_type = '';

control_to_block = false;


  // Função para chamar a busca quando o usuário digita
  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }


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
        this.service_type = response.data[0].service_type;
        this.isLoad = false;
        // bloco responsavel por fazer a soma entre os subtotais, para nao precisar criar outra chamada para api
        this.total = this.sumSubTotal();
      // fim do bloco de somar valores
      // colocando na localstorage o id_order para adicionar mais itens
      localStorage.setItem('id_order_snack', this.identity);
      this.verifyMoreItem();
      this.verifyStatusOrder(this.status);
      }else{
        // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
    }
    this.globalService.veryTokenExpired(response);
    
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
      this.globalService.veryTokenExpired(data);
    });
  }

  
  itemInOrder: ItemInOrderSnack = {id_order_snack: '', id_item: '', price_unit: '', quantity: '', total: ''}

  insertItemInOrder(id_item: string, price_unit: string, quantity: string, total: string){
    this.getDetailOrder(1);
    console.log(this.control_to_block)
    //bloco para verificar se esta permitido adicionar mais itens ou nao
    // por mais que nao apareça mais os itens para adicionar, é só mais uma trava
    if (this.control_to_block == true){
      console.log('Pedido ja finalizado');
      return;
    }

    this.itemInOrder.id_item = id_item;
    this.itemInOrder.price_unit = price_unit;
    this.itemInOrder.quantity = quantity;
    this.itemInOrder.total = total;
    this.itemInOrder.id_order_snack = this.pedido;
    this.api.insertItemInOrder(this.itemInOrder).subscribe(data => {
      if('error' in data) {
        this.globalService.openSnackBar(data.message ?? 'Pedido não encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Item adicionado ao pedido', 'Ok', 'Sucesso!', 'success-snackbar');
        this.getDetailOrder(1);
      }
      this.globalService.veryTokenExpired(data);
    })
  }

  removeItemOrder: RemoveItemInOrder = {id_order_snack_items: 0}
  
  removeItemFromOrder(id_order_snack_items: number){
    this.removeItemOrder.id_order_snack_items = id_order_snack_items;
    this.api.removeItemFromOrder(this.removeItemOrder).subscribe(data => {
      if('error' in data){
        this.globalService.openSnackBar('Não foi possível remover o item', 'Ok', 'Erro!', 'error-snackbar');
      }else{
        this.globalService.openSnackBar('Item removido do pedido', 'Ok', 'Sucesso!', 'success-snackbar');
        this.getDetailOrder(1);
      }
      this.globalService.veryTokenExpired(data);
    })
  }


  // funcao para verificar se o pedido ja esta encerrado ou nao, caso esteja finalizado ele bloqueia a adicao de itens
  verifyStatusOrder(status: any){
    if(status == 'Concluído' || status == 'Concluido'){
      this.control_to_block = true;
    }else{
      this.control_to_block = false;
    }
  }
}
