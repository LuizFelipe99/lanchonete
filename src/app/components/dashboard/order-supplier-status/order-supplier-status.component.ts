import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-order-supplier-status',
  templateUrl: './order-supplier-status.component.html',
  styleUrls: ['./order-supplier-status.component.scss']
})
export class OrderSupplierStatusComponent {

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
    // this.graficoCategoria();
    this.getOrderStatus();
  }
  // categories: 0;
  
  // variaveis utilizadas no grafico
  chartData: any;
  panelOpenState = false;
  public chart: Chart;
  
  totalCategories: any;
// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getOrderStatus(){
    this.api.getStatusOrders().subscribe(data => {

      this.totalCategories = data.orders.map(orders => orders.orders);
      
      this.chartData = {
        labels: data.labels.map(label => label.label),
        values: data.quantity.map(item => item.quantity),
      };
      // Chame a função drawChart() após receber os dados
      this.drawChart();
    });
  }




  drawChart(): void {
    if (this.chartData) {
      const ctx = document.getElementById('orderSupplierStatus') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Pedidos',
            data: this.chartData.values,
            backgroundColor: [
              'rgba(226, 227, 229, 1)',
              'rgba(255, 243, 205, 1)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(212, 237, 218, 1)'
            ],
            borderColor: [
              'rgba(113, 117, 125, 1)',
              'rgba(193, 180, 140, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(107, 137, 115, 1)'
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
