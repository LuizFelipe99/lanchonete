import { Component, AfterViewInit  } from '@angular/core';
// import { Chart, ChartType } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';


// chart.component.ts
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-categories',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.scss']
})
export class UsersDashComponent {

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
  // this.graficoCategoria();
  this.getUserStats();
  }


// variaveis utilizadas no grafico
  chartData: any;
  panelOpenState = false;
  public chart: Chart;

// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getUserStats(){
    this.api.getUserStats().subscribe(data => {
      this.chartData = {
        labels: data.labels.map(label => label.status === 0 ? 'Inativos' : 'Ativos'),
        values: data.quantity.map(item => item.quantity)
      };

      // Chame a função drawChart() após receber os dados
      this.drawChart();
    });
  }


  drawChart(): void {
    if (this.chartData) {
      const ctx = document.getElementById('usersChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Quantidade de Usuários',
            data: this.chartData.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          // Opções do gráfico (se necessário)
        }
      });
    }
  }
}
