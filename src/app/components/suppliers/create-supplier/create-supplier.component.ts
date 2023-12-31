import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { GlobalService } from 'src/app/global.service';
import { Supplier } from 'src/app/models/Supplier/supplier.model';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss'],
})
export class CreateSupplierComponent {

  isLoad: boolean = false;

  suppliers: Supplier[] = [];
  newSupplier: Supplier = {name: '', responsible: '', adress: '', contact_supplier: '', contact_responsible: '', catalog: '', type: '', active: 0}

  constructor(private api: SupplierService, private globalService: GlobalService) {}

  // função para criar fornecedor
  insertSupplier(): void {
    this.isLoad == true;
    this.api.insertSupplier(this.newSupplier).subscribe(createSupplier => {
      if ('error' in createSupplier) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    })
  }
}
