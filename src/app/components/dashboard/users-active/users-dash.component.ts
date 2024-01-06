import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { UserStatsDashboard } from 'src/app/models/Dashboard/users-status.model';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-categories',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.scss']
})
export class UsersDashComponent {

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  // users: UserStatsDashboard[];
  users: UserStatsDashboard = { labels: [], quantity: []};
  // filterUser: UserFilter = { name: '', login: '', active: 1, per_page: 15};

  // variaveis para controlar paginação
  // labels: number = 0;
  // totalPages: number = 0;
  // currentPage: number = 1;
  // isLoad: boolean = false;


// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getUserStats(){
    this.api.getUserStats().subscribe(data => {
      if ('error' in data){
        // this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
      }else{
        this.users.labels = data.labels;
      }
    });
  }


  panelOpenState = false;


  public chart: Chart;

  ngOnInit(): void {
  this.graficoCategoria();
  this.getUserStats();
  }

  graficoCategoria(){
  // datos
  const data = {
    labels: [
      'Ativos',
      'Inativos',
    ],
    datasets: [{
      label: 'Usuários',
      data: [20, 50],
      backgroundColor: [
        'rgb(11, 204, 88)',
        'rgb(204, 3, 6)',
      ],
      hoverOffset: 4
    }]
  };
  // Creamos la gráfica
  this.chart = new Chart("chart", {
    type: 'doughnut' as ChartType, // tipo de la gráfica 
    data // datos 
  })

  }
}
