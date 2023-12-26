import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { GlobalService } from 'src/app/global.service'; 

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss'],
})
export class ListSupplierComponent {
  formData: {
    name: string;
    responsible: string;
    type: string;
    active: number;
    perPage: number;
  } = {
    name: '',
    responsible: '',
    type: '',
    active: 4,
    perPage: 15,
  };

  suppliers: any[] = [];
  totalSuppliers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;

  constructor(private api: SupplierService, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getSuppliers(this.pagination);
  }

  getSuppliers(pagination: number) {
    this.isLoad = true;
    const { name, responsible, type, active, perPage } = this.formData;
    this.api
      .getSuppliers(name, responsible, type, active, pagination, perPage)
      .then(
        (response) => {
          this.suppliers = response.data;
          this.totalSuppliers = response.suppliers;
          this.totalPages = response.total_pages;
          this.currentPage = response.current_page;
          this.isLoad = false;
          if (response.status === true) {
          } else {
            this.isLoad = false;
          }
        },
        (error: any) => {
          this.isLoad = false;
          console.error('Erro ao buscar fornecedores: ', error);
        }
      );
  }
}
