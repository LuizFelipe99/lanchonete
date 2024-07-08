import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { financeDashModel } from 'src/app/models/Dashboard/finance.model';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-finance-dash',
  templateUrl: './finance-dash.component.html',
  styleUrls: ['./finance-dash.component.scss']
})
export class FinanceDashComponent {
  public chart: Chart;

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  results: financeDashModel[];


  ngOnInit(): void {
    // this.graficoCategoria();
    this.getFinanceDash();
    this.drawChart();
    }
    total_current_month: any = 0;
    total_order_supplier: any = 0;
    total_order_snack: any = 0;


    getFinanceDash(){
      this.api.getFinanceDash().subscribe(data => {
        if ('error' in data){
          this.globalService.openSnackBar('Erro na consulta de dashboard', 'Ok',  'Erro!', 'error-snackbar');
        }else{
          this.total_current_month = data.current_month[0]['total'];
          this.total_order_supplier = data.order_supplier[0]['total'];
          this.total_order_snack = data.order_snack[0]['total'];
        }
        this.globalService.veryTokenExpired(data);
      });
    }
  

  drawChart(): void {
      const ctx = document.getElementById('financeChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          datasets: [{
            label: 'Labels',
            data: [1,2,3,4,5,6,7,8,9,10,11,12],
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
