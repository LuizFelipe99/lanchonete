import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss'],
})
export class CreateSupplierComponent {
  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical

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

  constructor(private api: SupplierService, private _snackBar: MatSnackBar) {}

  openSnackBar(displayMessage: string, buttonText: string, type: string, style: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: type,
      },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: style,
    });
  }

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
          this.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
          this.isLoad = false;
        }else{
          this.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        }
      })
      .catch((error) => {
        this.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
        console.error('Erro de Cadastro: ', error);
      });
  }
}
