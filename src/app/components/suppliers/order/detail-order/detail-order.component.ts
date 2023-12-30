import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
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
   constructor(private api: SupplierService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {
  }

  ngOnInit(): void {
    this.getDetailOrder();
  }

  detailOder: any[] = [];
  totalOrders: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;

  getDetailOrder() {
    this.isLoad = true;
    this.api.getDetailOrder(this.identity).then((response) => {
          this.detailOder = response.data; // Armazene os usuários na variável 'usuarios'
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
}
