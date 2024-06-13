import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { GlobalService } from 'src/app/global.service';
import { Supplier, SupplierFilter } from 'src/app/models/Supplier/supplier.model';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss'],
})
export class ListSupplierComponent {

  constructor(private api: SupplierService, public globalService: GlobalService) {}

  suppliers: Supplier[];
  filterSupplier: SupplierFilter = {name: '', responsible: '', active: 1};

  page: number = 1;
  totalSuppliers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  ngOnInit(): void {
    this.getSuppliers(this.page);
  }

  getSuppliers(page: number) {
    this.isLoad = true;    
    this.api.getSuppliers(this.filterSupplier, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {            
          this.suppliers = data.data;
          this.totalSuppliers = data.suppliers;
          this.totalPages = data.total_pages;
          this.currentPage = data.current_page;
          this.isLoad = false;            
        }
      }       
    );
  }

  clearInputs(){
    this.filterSupplier.name = "";
    this.filterSupplier.responsible = "";
  }
}
