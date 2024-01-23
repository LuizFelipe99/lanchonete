import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GlobalService } from 'src/app/global.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { ItemInOrder } from 'src/app/models/Item-Supplier/item.models';

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
   constructor(private api: OrderService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>, public item: ItemSupplierService) {

   // Formata a data atual para mostrar apenas ano, mês e dia
   this.dataAtualFormatada = this.formatarData(this.dataAtual);


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
  dt_expired: string = '';
  pedido: string = '';

  dataAtualFormatada: string;
  dataAtual = new Date();
  addItem = false;
  id_item_to_remove = 0;
  removeItem: ItemInOrder = { id_order_supplier_items: '1'};
  status = '';

// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
removeItemOrder(id_order_supplier_items: string){
  // adicionando o valor recebid por parametro la do front ao valor da variavel a ser enviada na requisição
  this.removeItem.id_order_supplier_items = id_order_supplier_items;
  this.isLoad = true;
  this.item.removeItemOrder(this.removeItem).subscribe(data => {
    if ('error' in data){
      this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
      this.isLoad = false;
    }else{
      this.globalService.openSnackBar('Item removido com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
      this.getDetailOrder(1);
      this.isLoad = false;
    }
  });
}

  getDetailOrder(pagination: number) {
    this.isLoad = true; // variavel que controla o simbolo de loading
    this.api.getDetailOrder(this.identity, pagination, this.perPage).then((response) => {
      if (response.status === true) {
      this.detailOder = response.data; 
      this.totalPages = response.total_pages;
      this.currentPage = response.current_page;
      this.supplier = response.data[0].supplier;
      this.dt_expired = response.data[0].dt_expired;
      this.pedido = response.data[0].id_order_supplier;
      this.id_item_to_remove = response.data[0].id_order_supplier_items;
      this.status = response.data[0].status;
      console.log(this.id_item_to_remove);
      this.isLoad = false;
      // bloco responsavel por fazer a soma entre os subtotais, para nao precisar criar outra chamada para api
      this.total = this.sumSubTotal();
      // fim do bloco de somar valores
      // colocando na localstorage o id_order para adicionar mais itens
      localStorage.setItem('id_order_supplier', this.identity);
      
      }else{
        // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
    }
    // chamando função para formatar data atual e chamando função para verificar se data atual é igual a this.dt_expired
    
    this.verifyExpiredOrder();
  },
  (error: any) => {
    this.isLoad = false;
    console.error('Erro ao buscar usuários:', error);
  })
  }


  sumSubTotal(): number {
    return this.detailOder.reduce((acumulador, objeto) => acumulador + objeto.total, 0);
    // console.log(acumulador);
  }

  formatarData(data: Date): string {
    const formattedDate = data.toISOString().slice(0, 10);
    return formattedDate;
  }

  verifyExpiredOrder(){
    this.formatarData(this.dataAtual);
    if (this.dt_expired < this.dataAtualFormatada) {
      console.log('menor');
      this.addItem = false;
    }else{
      console.log('maior');
      this.addItem = true
    }
  }


}
