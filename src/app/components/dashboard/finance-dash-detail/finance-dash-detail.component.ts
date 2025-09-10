import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-finance-dash-detail',
  templateUrl: './finance-dash-detail.component.html',
  styleUrls: ['./finance-dash-detail.component.scss']
})
export class FinanceDashDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('financeChartDetail', { static: false })
  chartCanvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('financeChartDetailBar', { static: false })
  chartCanvasBar?: ElementRef<HTMLCanvasElement>;

  public chart: Chart<'doughnut', number[], string> | null = null;
  public chartBar: Chart<'bar', number[], string> | null = null;

  barChartControl = false;               // false = donut (pizza), true = barras

  current_month: any;

  public labels: string[] = [];
  public quantities: number[] = [];

  public colorsBg: string[] = ['#34495E', '#FF902B', '#27C24C'];
  public colorsFooter: string[] = ['#2C3E50', '#F77600', '#1E983B'];

  private dataLoaded = false;
  private viewReady = false;

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getFinanceDetailDash();
  }

  ngAfterViewInit(): void {
    // ViewChildren com { static:false } só existem após o view init
    this.viewReady = true;
    this.initChartsIfReady();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.chartBar) {
      this.chartBar.destroy();
      this.chartBar = null;
    }
  }

  private formatBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value ?? 0);
  }

  private initChartsIfReady(): void {
    // Cria SOMENTE o gráfico que está visível no momento
    if (!this.dataLoaded || !this.viewReady) return;

    if (this.barChartControl) {
      this.drawBarChart(this.labels, this.quantities);
    } else {
      this.drawChart(this.labels, this.quantities);
    }
  }

  getFinanceDetailDash(): void {
    this.api.getFinanceDetailDash().subscribe({
      next: (data) => {
        this.labels = data.labels || [];
        this.quantities = data.quantity || [];
        this.current_month = data.month || '';

        this.dataLoaded = true;
        this.initChartsIfReady();
        this.globalService.veryTokenExpired(data);
      },
      error: (error) => {
        console.error('Erro ao carregar dados financeiros:', error);
      }
    });
  }

  drawChart(labels: string[], quantities: number[]): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) {
      // Canvas não existe quando *ngIf esconde o donut
      return;
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Recebido',
          data: quantities,
          backgroundColor: this.colorsBg,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0,
        layout: { padding: 0 },
        cutout: '45%',
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { boxWidth: 20, padding: 15 }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value: number = context.parsed || 0;
                return `${label}: ${this.formatBRL(value)}`;
              }
            }
          }
        },
        animation: { duration: 250 }
      }
    };

    this.chart = new Chart(canvas, config);
  }

  drawBarChart(labels: string[], quantities: number[]): void {
    const canvas = this.chartCanvasBar?.nativeElement;
    if (!canvas) {
      // Canvas não existe quando *ngIf esconde as barras
      return;
    }

    if (this.chartBar) {
      this.chartBar.destroy();
      this.chartBar = null;
    }

    const config: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Recebido',
          data: quantities,
          backgroundColor: this.colorsBg,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0,
        layout: { padding: 0 },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { boxWidth: 20, padding: 15 }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value: number = context.parsed || 0;
                return `${label}: ${this.formatBRL(value)}`;
              }
            }
          }
        },
        animation: { duration: 250 }
      }
    };

    this.chartBar = new Chart(canvas, config);
  }

  // Alterna pizza <-> barras
  changeChart(): void {
    this.barChartControl = !this.barChartControl;

    // Espera o *ngIf renderizar o canvas correspondente e cria o gráfico certo
    setTimeout(() => {
      if (this.barChartControl) {
        // indo para barras
        if (this.chart) { this.chart.destroy(); this.chart = null; }
        this.drawBarChart(this.labels, this.quantities);
      } else {
        // voltando para donut
        if (this.chartBar) { this.chartBar.destroy(); this.chartBar = null; }
        this.drawChart(this.labels, this.quantities);
      }
    });
  }
}
