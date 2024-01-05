import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  panelOpenState = false;


  public chart: Chart;

  ngOnInit(): void {
    // datos
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'Categorias',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
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
