import { OrderService } from 'src/app/services/order.service';
import {Component} from '@angular/core';
import { OrderSupplier } from 'src/app/models/Order/order_supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier, SupplierFilter } from 'src/app/models/Supplier/supplier.model';
import { GlobalService } from 'src/app/global.service';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { Item, ItemFilter } from 'src/app/models/Item-Supplier/item.models';



@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  // PEGANDO ID DO USUARIO NA LOCALSTORAGE PARA MANDAR JUNTO A REQUISIÇÃO
  get id_user(): string {
    return localStorage.getItem('id_user') || ''; // Obter o nome do usuário do localStorage
  }

  constructor(private api: OrderService, private supplier: SupplierService, private item: ItemSupplierService, public globalService: GlobalService){}

  ngOnInit(){
    this.getSupplierNames();
    this.getItemNames();
  }

  suppliers: Supplier[];
  filterSupplier: SupplierFilter = {name: '', responsible: '', active: 1, per_page: 15};

  items: Item[];
  filterItem: ItemFilter = {name: '', description: '', category: ''};

  orders: OrderSupplier[] = [];
  newOrder: OrderSupplier = {
    id_supplier: 0,
    dt_expired: '',
    created_by: this.id_user,
    // Preencha outras propriedades conforme necessário
  };
  isLoad = false;
  addItem = false;

  id_order_supplier = <any> '';

  createNewOrder(): void {
    this.isLoad = true;
    
    this.api.createOrder(this.newOrder).subscribe(createdOrder => {
      if ('error' in createdOrder) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
        this.addItem = false;
      } else {
        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.globalService.openDialog('Selecione o item', 'list-item', '1', '80%');
        // setando na localstorage o id da order
        this.id_order_supplier = createdOrder;
        localStorage.setItem('id_order_supplier',this.id_order_supplier['order_supplier']);
        this.isLoad = false;
        this.addItem = true;
      }
      // Atualizar a lista de ordens após o cadastro (opcional)
      // this.loadOrders();
      //funcao que verifica token
      this.globalService.veryTokenExpired(createdOrder);
    });
  }

  getSupplierNames(): void{
    this.supplier.getSuppliers(this.filterSupplier).subscribe(data => {
      this.suppliers = data.data;
      this.globalService.veryTokenExpired(data);
    });
  }

  getItemNames(): void {
    this.item.getItems(this.filterItem).subscribe(data => {
      this.items = data.data;
      this.globalService.veryTokenExpired(data);
    })
  }
}
