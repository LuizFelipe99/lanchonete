import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from '../../shared/dialog-form-details/dialog-form-details.component';

import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent {
  ngOnInit(): void {
    this.getSupplierById();
  }
  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }


  constructor(private api: SupplierService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {}


// objeto para receber os dados da api
  supplier: any[] = [];
  teste: any;

  isLoad: boolean = false;
   // Método para filtro e paginação
   getSupplierById() {
    this.isLoad = true;
    this.api
      .getSupplierById(this.identity)
      .then(
        (response) => {
          this.supplier = response.data; // Armazene os usuários na variável 'usuarios'
          console.log(this.supplier);
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
        }
      );
  }

  msg(){
    this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
