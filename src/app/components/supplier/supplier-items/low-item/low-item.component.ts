import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, debounceTime, switchMap } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { ItemFilter, lowItemStock } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';

@Component({
  selector: 'app-low-item',
  templateUrl: './low-item.component.html',
  styleUrls: ['./low-item.component.scss']
})
export class LowItemComponent {
  isLoad = false;

  constructor(private api: ItemSupplierService, private globalService: GlobalService){}

  lowItem: lowItemStock = { id_item: '', qte_remove: '' };
  filterItem: ItemFilter = { name: '', description: '', category: '', current_stock: 0, per_page: 15, rank: '' };

  itemControl = new FormControl();
  items: any[] = [];
  filteredItems!: Observable<any[]>;

  ngOnInit() {
    this.filteredItems = this.itemControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adiciona um pequeno atraso para reduzir o número de requisições
      switchMap(value => this._filterItems(value || ''))
    );
  }

  private _filterItems(value: string): Observable<any[]> {
    const filterValue = value.toLowerCase();
    this.filterItem.name = filterValue;  // Ajusta o filtro com base no valor digitado

    // Faz a chamada à API e retorna um Observable com os itens filtrados
    return this.api.getItems(this.filterItem, 1).pipe(
      map(data => {
        if ('error' in data) {
          this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
          this.isLoad = false;
          return [];
        } else {
          return data.data;  // Retorna os itens vindos da API
        }
      })
    );
  }

  lowItemStock(): void {
    this.isLoad = true;
    this.api.lowItemToStock(this.lowItem).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar(data.message, 'Ok', 'Erro!', 'error-snackbar');
      } else {
        this.globalService.openSnackBar(data.message, 'Ok', 'Sucesso!', 'success-snackbar');
      }
      this.isLoad = false;
      this.globalService.veryTokenExpired(data);
    });
  }
}
