import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-finance-dash-detail',
  templateUrl: './finance-dash-detail.component.html',
  styleUrls: ['./finance-dash-detail.component.scss']
})
export class FinanceDashDetailComponent {

  
  constructor(private api: DashBoard, public globalService: GlobalService) {}
  
  public chart: Chart;
  chartData: any;
  result: any;
  ngOnInit(): void {
    this.getFinanceDetailDash();
    this.drawChart();
    }
    // financeDetail: financeDashModel[];
    total_pix: any;
    total_cash: any;
    total_card: any;

    getFinanceDetailDash(){
      this.api.getFinanceDetailDash().subscribe(data => {
        this.total_pix = data.total_pix[0];
        this.total_cash = data.total_cash[0];
        this.total_card= data.total_card[0];
        this.drawChart();
        this.globalService.veryTokenExpired(data);
      });
    }

  drawChart(): void {
    const ctx = document.getElementById('financeChartDetail') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Pix", "Dinheiro", "Cartão"],
        datasets: [{
          label: 'Recebido',
          data: [this.total_pix['total_pix'], this.total_cash['total_cash'], this.total_card['total_card']],
          backgroundColor: [
            '#37BC9B',
            '#FF902B',
            '#27C24C'
          ],
          borderColor: [
            '#37BC9B',
            '#FF902B',
            '#27C24C'
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
