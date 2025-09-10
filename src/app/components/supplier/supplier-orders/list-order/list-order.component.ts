import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GlobalService } from 'src/app/global.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderFilter, OrderSupplier } from 'src/app/models/Order/order_supplier.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  constructor(
    private api: OrderService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.getOrders(this.page);
  }

  // Lista e filtros
  orders: OrderSupplier[] = [];
  filterOrder: OrderFilter = {
    supplier: '',
    responsible: '',
    id_order_supplier: 0,
    // antes: active
    status: 3, // sugestão: 3 = "Todos"/Aguardando; ajuste se quiser outro default
  };

  // Paginação/estado
  page = 1;
  totalOrders = 0;
  totalPages = 0;
  currentPage = 1;
  isLoad = false;

  getOrders(page: number): void {
    this.isLoad = true;
    this.api.getOrders(this.filterOrder, page).subscribe({
      next: (data: any) => {
        if ('error' in data) {
          this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
          this.isLoad = false;
          return;
        }
        this.orders = data?.data ?? [];
        this.totalPages = Number(data?.total_pages ?? 0);
        this.currentPage = Number(data?.current_page ?? 1);
        this.totalOrders = Number(data?.orders ?? 0);
        this.isLoad = false;
        this.globalService.veryTokenExpired(data);
      },
      error: () => {
        this.isLoad = false;
        this._snackBar.open('Erro ao carregar pedidos.', 'Fechar', { duration: 3000 });
      }
    });
  }

  clearInputs(): void {
    this.filterOrder.supplier = '';
    this.filterOrder.responsible = '';
    this.filterOrder.id_order_supplier = 0;
    // this.filterOrder.status = 3; // se quiser resetar o status também
  }

  /* ===== Helpers de Status (status) =====
     1 = Recebido | 2 = Cancelado | 3 = Aguardando
  */
  statusLabel(status: number | string): string {
    const n = Number(status);
    if (n === 1) return 'Recebido';
    if (n === 2) return 'Cancelado';
    if (n === 3) return 'Aguardando';
    return '—';
  }

  statusClass(status: number | string): 'success' | 'danger' | 'warn' {
    const n = Number(status);
    if (n === 1) return 'success';
    if (n === 2) return 'danger';
    return 'warn'; // 3 (aguardando) ou qualquer outro
  }

  statusIcon(status: number | string): string {
    const n = Number(status);
    if (n === 1) return 'check_circle';
    if (n === 2) return 'cancel';
    return 'schedule'; // 3 = aguardando
  }
}
