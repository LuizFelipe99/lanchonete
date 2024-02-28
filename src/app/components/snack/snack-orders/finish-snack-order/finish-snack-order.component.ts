import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { FinishOrder } from 'src/app/models/Snack-Order/snack-order.models';
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

total_order: number = 0;
pedido: string = '';
status = '';
payment_type = '';
service_type = '';

pago: number = 0;
restante: number = 0;
isDecrease = false;

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
        this.total_order = this.sumSubTotal();

        this.pago = response.payament[0].pago;
        this.restante = (this.total_order - this.pago);
        this.isLoad = false;
        this.verificaPendencia()
        // bloco responsavel por fazer a soma entre os subtotais, para nao precisar criar outra chamada para api
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
    verificaPendencia(){
      if(this.restante <= 0){
        this.isDecrease = true;
      }
    }

    FinishOrder: FinishOrder = {
      id_order_snack: this.identity,
      total: 0,
      discounted_value: '',
      discounted_type: ''
    };
    finishOrderSnack(){
      this.FinishOrder.total = this.sumSubTotal();
      this.api.finishOrderSnack(this.FinishOrder).subscribe((response) =>{
        console.log(response);
        if ('error' in response) {
          this.globalService.openSnackBar('Não há valores para abater', 'Ok', 'Erro!', 'error-snackbar');
          this.isLoad = false;
        } else {
          
  
          this.globalService.openSnackBar('Valor abatido com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
          // setando na localstorage o id da order
          this.isLoad = false;
          this.getDetailOrder(1);
        }
        // Atualizar a lista de ordens após o cadastro (opcional)
        // this.loadOrders();
      });
    }
}
