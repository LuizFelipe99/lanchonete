import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Snack, SnackFilter } from 'src/app/models/Snack/snack.models';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-list-snack',
  templateUrl: './list-snack.component.html',
  styleUrls: ['./list-snack.component.scss']
})
export class ListSnackComponent {
  constructor(private api: SnackService, public globalService: GlobalService) {}

  snacks: Snack[];
  filterSnack: SnackFilter = {name: '', description: ''};

  page: number = 1;
  totalSnacks: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  ngOnInit(): void {
    this.getSnacks(this.page);
  }

  getSnacks(page: number) {
    this.isLoad = true;
    this.api.getSnacks(this.filterSnack, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
          this.snacks = data.data;
          this.totalSnacks = data.snacks;
          this.totalPages = data.total_pages;
          this.currentPage = data.current_page;
          this.isLoad = false;
        }
      }
    );
  }
}
