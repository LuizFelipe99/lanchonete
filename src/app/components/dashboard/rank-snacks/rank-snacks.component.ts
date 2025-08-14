import { Component } from '@angular/core';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';
import { GlobalService } from 'src/app/global.service';
import { itemRank } from 'src/app/models/Dashboard/rank-item.model';

@Component({
  selector: 'app-rank-snacks',
  templateUrl: './rank-snacks.component.html',
  styleUrls: ['./rank-snacks.component.scss']
})
export class RankSnacksComponent {
 ngOnInit(): void {
  this.getRankItems();
  }
  constructor(private api: DashBoard, public globalService: GlobalService) { }

  card_title = "Items mais vendidos"

  // requiisição tipada
  items: itemRank[];
  isLoad: boolean = false;
  snacks: any;
  total_values: any = 0;
  // passando a pagina por parametro para a paginação
  // a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
  getRankItems() {
    console.log("passei");
    this.isLoad = true;
      this.api.getRankItems().subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.items = data.data;
        this.snacks = data.snacks;
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(data);
    });
  }
}
