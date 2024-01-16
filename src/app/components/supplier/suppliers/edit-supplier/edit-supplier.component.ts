import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from '../../../shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Supplier, SupplierFilter } from 'src/app/models/Supplier/supplier.model';

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
  suppliers: Supplier[];
  filterSupplier: SupplierFilter = {id_supplier: this.identity}
  newSupplier: Supplier = {name: '', responsible: '', adress: '', contact_supplier: '', contact_responsible: '', catalog: '', type: '', active: 0};
  isLoad: boolean = false;

   // Método para filtro e paginação
  getSupplierById() {
    this.isLoad = true;
    this.api.getSupplierById(this.filterSupplier).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.suppliers = data.data; // Armazene os usuários na variável 'usuarios'
        this.newSupplier.name = this.suppliers[0].name;
        this.newSupplier.responsible = this.suppliers[0].responsible;
        this.newSupplier.adress = this.suppliers[0].adress;
        this.newSupplier.contact_supplier = this.suppliers[0].contact_supplier;
        this.newSupplier.contact_responsible = this.suppliers[0].contact_responsible;
        this.newSupplier.catalog = this.suppliers[0].catalog;
        this.newSupplier.type = this.suppliers[0].type;
        this.newSupplier.active = this.suppliers[0].active;
        this.isLoad = false;
      }
    });
}

  // função que atualiza o cadastro
  updateSupplier() {
    console.log(this.newSupplier);
    this.isLoad = true;
    this.api.updateSupplier(this.newSupplier, this.identity).subscribe(createSupplier => {
      if ('error' in createSupplier) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
      this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    },
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
