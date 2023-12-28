import { Component } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { SupplierService } from 'src/app/services/supplier.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss'],
})
export class CreateSupplierComponent {
  formData: {
    name: string;
    responsible: string;
    adress: string;
    contact_supplier: string;
    contact_responsible: string;
    catalog: string;
    type: string;
    active: number;
  } = {
    name: '',
    responsible: '',
    adress: '',
    contact_supplier: '',
    contact_responsible: '',
    catalog: '',
    type: '',
    active: 1,
  };

  suppliers: any[] = [];
  totalSuppliers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;

  constructor(private api: SupplierService, private _snackBar: MatSnackBar, private globalService: GlobalService) {}


  insertSupplier() {
    this.isLoad == true;
    const {
      name,
      responsible,
      adress,
      contact_supplier,
      contact_responsible,
      catalog,
      type,
      active,
    } = this.formData;
    this.api
      .insertSupplier(
        name,
        responsible,
        adress,
        contact_supplier,
        contact_responsible,
        catalog,
        type,
        active
      )
      .then((response) => {
        this.suppliers = response.data;
        this.totalSuppliers = response.suppliers;
        this.totalPages = response.total_pages;
        this.currentPage = response.current_page;
        if (response.status === true) {
          this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
          this.isLoad = false;
        }else{
          this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        }
      })
      .catch((error) => {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
        console.error('Erro de Cadastro: ', error);
      });
  }
}
