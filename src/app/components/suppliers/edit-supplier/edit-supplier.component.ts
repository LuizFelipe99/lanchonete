import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent {
  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }

  ngOnInit(): void {
    this.getSupplierById();
  }

  constructor(private api: SupplierService, private _snackBar: MatSnackBar) {}

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
            // this.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
            this.isLoad = false;
        }
        },
        (error: any) => {
          // this.isLoad = false;
          console.error('Erro ao buscar usuários:', error);
        }
      );
  }
}
