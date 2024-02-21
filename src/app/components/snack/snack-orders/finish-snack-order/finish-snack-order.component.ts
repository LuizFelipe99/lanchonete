import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { OrderSnackService } from 'src/app/services/order-snack.service';

@Component({
  selector: 'app-finish-snack-order',
  templateUrl: './finish-snack-order.component.html',
  styleUrls: ['./finish-snack-order.component.scss']
})
export class FinishSnackOrderComponent {
 //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }
  // metodo construtor
constructor(private api: OrderSnackService, public globalService: GlobalService) {}

ngOnInit(): void {
  this.getDetailOrder(this.pagination);
}

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
status = '';
payment_type = '';
service_type = '';

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
        // colocando na localstorage o id_order para adicionar mais itens
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
}
