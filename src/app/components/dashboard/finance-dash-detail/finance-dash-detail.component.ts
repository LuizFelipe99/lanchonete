import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-finance-dash-detail',
  templateUrl: './finance-dash-detail.component.html',
  styleUrls: ['./finance-dash-detail.component.scss']
})
export class FinanceDashDetailComponent implements OnInit {

  public chart: Chart<'doughnut', number[], string>;
  current_month: any [];

  public labels: string[] = [];
  public quantities: number[] = [];

  public colorsBg: string[] = ['#34495E', '#FF902B', '#27C24C'];
  public colorsFooter: string[] = ['#2C3E50', '#F77600', '#1E983B'];

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getFinanceDetailDash();
  }

  getFinanceDetailDash(): void {
    this.api.getFinanceDetailDash().subscribe(data => {
      this.labels = data.labels || [];
      this.quantities = data.quantity || [];
      this.current_month = data.month;
      console.log(this.current_month);

      this.drawChart(this.labels, this.quantities);

      this.globalService.veryTokenExpired(data);
    }, error => {
      console.error('Erro ao carregar dados financeiros:', error);
    });
  }

  drawChart(labels: string[], quantities: number[]): void {
    const ctx = document.getElementById('financeChartDetail') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Recebido',
          data: quantities,
          backgroundColor: this.colorsBg,
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
              padding: 15
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: R$ ${value.toFixed(2)}`;
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
