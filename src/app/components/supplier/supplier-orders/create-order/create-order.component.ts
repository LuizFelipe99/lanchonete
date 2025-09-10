import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { finalize } from 'rxjs/operators';

import { GlobalService } from 'src/app/global.service';
import { OrderService } from 'src/app/services/order.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

import { OrderSupplier } from 'src/app/models/Order/order_supplier.model';
import { Supplier, SupplierFilter } from 'src/app/models/Supplier/supplier.model';
import { Item, ItemFilter } from 'src/app/models/Item-Supplier/item.models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  // opcional: deixa o datepicker e máscaras em pt-BR
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class CreateOrderComponent implements OnInit {

  // PEGANDO ID DO USUARIO NA LOCALSTORAGE PARA MANDAR JUNTO A REQUISIÇÃO
  get id_user(): string {
    return localStorage.getItem('id_user') || '';
  }

  constructor(
    private api: OrderService,
    private supplier: SupplierService,
    private item: ItemSupplierService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.getSupplierNames();
    this.getItemNames();
  }

  suppliers: Supplier[] = [];
  filterSupplier: SupplierFilter = { name: '', responsible: '', active: 1, per_page: 15 };

  items: Item[] = [];
  filterItem: ItemFilter = { name: '', description: '', category: '' };

  orders: OrderSupplier[] = [];

  /** Permite bindar o Datepicker (Date) e ainda enviar string pra API */
  newOrder: OrderSupplier & { dt_expired: string | Date } = {
    id_supplier: 0,
    dt_expired: '',
    created_by: this.id_user
  };

  isLoad = false;
  addItem = false;

  id_order_supplier: any = '';

  /** Helper: formata Date/string ISO para dd/MM/yyyy */
  private toDMY(input: any): string {
    if (!input) return '';
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  }

  createNewOrder(): void {
    this.isLoad = true;

    // monta payload com data no formato dd/MM/yyyy
    const payload: OrderSupplier = {
      ...this.newOrder,
      dt_expired: this.toDMY(this.newOrder.dt_expired)
    } as OrderSupplier;

    this.api.createOrder(payload)
      .pipe(finalize(() => (this.isLoad = false)))
      .subscribe({
        next: (createdOrder: any) => {
          if ('error' in createdOrder) {
            this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
            this.addItem = false;
          } else {
            this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');

            // abre seleção de itens
            this.globalService.openDialog('Selecione o item', 'list-item', '1', '80%');

            // armazena id da order (mantendo sua lógica)
            this.id_order_supplier = createdOrder;
            localStorage.setItem('id_order_supplier', this.id_order_supplier['order_supplier']);

            this.addItem = true;
          }
          this.globalService.veryTokenExpired(createdOrder);
        },
        error: (err) => {
          this.globalService.openSnackBar('Falha ao criar pedido', 'Ok', 'Erro!', 'error-snackbar');
          console.error('Erro ao criar pedido:', err);
        }
      });
  }

  getSupplierNames(): void {
    this.supplier.getSuppliers(this.filterSupplier).subscribe({
      next: (data: any) => {
        this.suppliers = data?.data || [];
        this.globalService.veryTokenExpired(data);
      },
      error: (err) => {
        console.error('Erro ao buscar fornecedores:', err);
      }
    });
  }

  getItemNames(): void {
    this.item.getItems(this.filterItem).subscribe({
      next: (data: any) => {
        this.items = data?.data || [];
        this.globalService.veryTokenExpired(data);
      },
      error: (err) => {
        console.error('Erro ao buscar itens:', err);
      }
    });
  }
}
