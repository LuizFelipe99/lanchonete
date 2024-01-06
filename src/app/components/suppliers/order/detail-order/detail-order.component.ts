import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GlobalService } from 'src/app/global.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {

  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }
   // metodo construtor
   constructor(private api: OrderService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {
  }

  ngOnInit(): void {
    this.getDetailOrder(this.pagination);
  }

  detailOder: any[] = [];
  totalOrders: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  perPage: number = 15;
  isLoad: boolean = false;

  supplier: string = '';

  total: number = 0;

  getDetailOrder(pagination: number) {
    this.isLoad = true; // variavel que controla o simbolo de loading
    this.api.getDetailOrder(this.identity, pagination, this.perPage).then((response) => {
      this.detailOder = response.data; 
      this.totalPages = response.total_pages;
      this.currentPage = response.current_page;
      this.supplier = response.data[0].supplier;

      // bloco responsavel por fazer a soma entre os subtotais, para nao precisar criar outra chamada para api
      this.total = this.sumSubTotal();
      // fim do bloco de somar valores
      
      // daí a gente faria assim..
      this.isLoad = false;
      if (response.status === true) {
      }else{
        // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
    }
  },
  (error: any) => {
    // this.isLoad = false;
    console.error('Erro ao buscar usuários:', error);
  })
  }


  sumSubTotal(): number {
    return this.detailOder.reduce((acumulador, objeto) => acumulador + objeto.subtotal, 0);
    // console.log(acumulador);
  }
}
