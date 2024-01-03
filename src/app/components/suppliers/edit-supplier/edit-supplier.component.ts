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

  formData: {id_supplier: string; name: string; responsible: string; adress: string; contact_supplier: string; contact_responsible: string; catalog: string; type: string; active: number} = {id_supplier: this.identity, name: '', responsible: '', adress: '', contact_supplier: '', contact_responsible: '', catalog: '', type: '', active: 1}

// objeto para receber os dados da api
  supplier: any[] = [];
  teste: any;
  isLoad: boolean = false;

   // Método para filtro e paginação
  getSupplierById() {
    this.isLoad = true;
    this.api.getSupplierById(this.identity).then((response) => {
          this.supplier = response.data; // Armazene os usuários na variável 'usuarios'
          this.formData.name = response.data[0].name;
          this.formData.responsible = response.data[0].responsible;
          this.formData.adress = response.data[0].adress;
          this.formData.contact_supplier = response.data[0].contact_supplier;
          this.formData.contact_responsible = response.data[0].contact_responsible;
          this.formData.catalog = response.data[0].catalog;
          this.formData.type = response.data[0].type;
          this.formData.active = response.data[0].active;

          this.isLoad = false;
          if (response.status === true) {
          }else{
            this.isLoad = false;
        }
        },
        (error: any) => {
          console.error('Erro ao buscar fornecedores:', error);
        }
      );
  }

  updateSupplier() {
    const {id_supplier, name, responsible, adress, contact_supplier, contact_responsible, catalog, type, active} = this.formData;
    this.api.updateSupplier(id_supplier, name, responsible, adress, contact_supplier, contact_responsible, catalog, type, active).then((response) => {this.supplier = response.data;
      if (response.status === true) {
        this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.getSupplierById();
    } else {
      this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
      this.isLoad = false;
    }},
    (error: any) => {
      console.error('Erro ao alterar fornecedor: ', error);

    })
  }

  msg(){
    this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
