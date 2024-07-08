import { Component, AfterViewInit  } from '@angular/core';
// import { Chart, ChartType } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';


// chart.component.ts
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-items-category',
  templateUrl: './items-category.component.html',
  styleUrls: ['./items-category.component.scss']
})
export class ItemsCategoryComponent {
  
  constructor(private api: DashBoard, public globalService: GlobalService) {}
  
  ngOnInit(): void {
    // this.graficoCategoria();
    this.getItemCategory();
  }
  // categories: 0;
  
  // variaveis utilizadas no grafico
  chartData: any;
  panelOpenState = false;
  public chart: Chart;
  
  totalCategories: any;
// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getItemCategory(){
    this.api.getItemCategory().subscribe(data => {
      const numberOfItems = data.labels.length;
      const backgroundColors = this.generateUniqueRandomColors(numberOfItems);

      this.totalCategories = data.categories.map(categories => categories.categories);
      
      this.chartData = {
        labels: data.labels.map(label => label.label),
        values: data.quantity.map(item => item.quantity),
        backgroundColors: backgroundColors,
        borderColor: backgroundColors,
      };
      console.log(backgroundColors);

      // Chame a função drawChart() após receber os dados
      this.drawChart();
      this.globalService.veryTokenExpired(data);
    });
  }




  drawChart(): void {
    if (this.chartData) {
      const ctx = document.getElementById('itemsChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Items',
            data: this.chartData.values,
            backgroundColor: this.chartData.backgroundColors, // Usando as cores geradas aleatoriamente
            borderColor: this.chartData.borderColor,
            borderWidth: 1
          }]
        },
        options: {
          // Opções do gráfico (se necessário)
        }
      });
    }
  }


  // Função para gerar cores aleatórias únicas
  // vao ser gerado a quantidade de itens encontrados no obj quantity
  generateUniqueRandomColors(quantity: number): string[] {
    const randomColors = new Set<string>(); // garante que as cores sejam unicas e nao se repetem

    // loop para criar cor enquanto for menor do que o valor do array
    while (randomColors.size < quantity) {
      const color = this.getRandomColor(); // Gera uma cor aleatória
      if (!randomColors.has(color)) {
        randomColors.add(color);
      }
    }

    return Array.from(randomColors);
  }

// Função para gerar uma cor aleatória
  getRandomColor(): string {
    // função que gera os valores randomicos de rgb
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  }
}

