import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LineChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface LineChartSeries {
  name: string;
  data: LineChartDataPoint[];
  color: string;
}

@Component({
  selector: 'lib-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() series: LineChartSeries[] = [];
  @Input() width: number = 500;
  @Input() height: number = 300;
  @Input() showGrid: boolean = true;
  @Input() showPoints: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() xAxisLabels: string[] = [];
  @Input() yAxisLabels: string[] = [];
  @Input() title: string = '';
  @Input() padding: number = 40;

  // Variables para el SVG
  viewBox: string = '';
  xScale: { min: number; max: number; step: number } = {
    min: 0,
    max: 0,
    step: 0,
  };
  yScale: { min: number; max: number; step: number } = {
    min: 0,
    max: 0,
    step: 0,
  };
  gridLines: { x: number[][]; y: number[][] } = { x: [], y: [] };
  chartWidth: number = 0;
  chartHeight: number = 0;

  linePaths: { path: string; color: string; name: string }[] = [];
  dataPoints: {
    x: number;
    y: number;
    value: number;
    color: string;
    name: string;
  }[] = [];

  ngOnInit() {
    this.calculateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['series'] ||
      changes['width'] ||
      changes['height'] ||
      changes['padding']
    ) {
      this.calculateChart();
    }
  }

  calculateChart() {
    this.chartWidth = this.width - this.padding * 2;
    this.chartHeight = this.height - this.padding * 2;
    this.viewBox = `0 0 ${this.width} ${this.height}`;

    // Encontrar los valores mínimos y máximos para los ejes
    let xMin = Number.MAX_VALUE;
    let xMax = Number.MIN_VALUE;
    let yMin = Number.MAX_VALUE;
    let yMax = Number.MIN_VALUE;

    this.series.forEach((serie) => {
      serie.data.forEach((point) => {
        xMin = Math.min(xMin, point.x);
        xMax = Math.max(xMax, point.x);
        yMin = Math.min(yMin, point.y);
        yMax = Math.max(yMax, point.y);
      });
    });

    // Ajustar los límites para tener un mejor margen
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    xMin = Math.max(0, xMin - xRange * 0.05);
    xMax = xMax + xRange * 0.05;
    yMin = Math.max(0, yMin - yRange * 0.1);
    yMax = yMax + yRange * 0.1;

    // Establecer la escala
    this.xScale = { min: xMin, max: xMax, step: xRange / 5 };
    this.yScale = { min: yMin, max: yMax, step: yRange / 5 };

    // Generar líneas de la grilla
    this.generateGridLines();

    // Generar los paths y puntos de datos
    this.generateChartData();
  }

  generateGridLines() {
    this.gridLines = { x: [], y: [] };

    // Líneas verticales (eje X)
    for (let i = 0; i <= 5; i++) {
      const x = this.padding + i * (this.chartWidth / 5);
      this.gridLines.x.push([x, this.padding, x, this.height - this.padding]);
    }

    // Líneas horizontales (eje Y)
    for (let i = 0; i <= 5; i++) {
      const y = this.height - this.padding - i * (this.chartHeight / 5);
      this.gridLines.y.push([this.padding, y, this.width - this.padding, y]);
    }
  }

  generateChartData() {
    this.linePaths = [];
    this.dataPoints = [];

    this.series.forEach((serie) => {
      if (serie.data.length < 2) return;

      // Crear el path para la línea
      let path = '';
      const mappedPoints: [number, number][] = [];

      serie.data.forEach((point, index) => {
        // Mapear los valores de datos a coordenadas SVG
        const x = this.mapValueToPixel(
          point.x,
          this.xScale.min,
          this.xScale.max,
          this.padding,
          this.width - this.padding
        );
        const y = this.mapValueToPixel(
          point.y,
          this.yScale.max,
          this.yScale.min,
          this.padding,
          this.height - this.padding
        );

        // Guardar el punto para usarlo con los círculos
        this.dataPoints.push({
          x,
          y,
          value: point.y,
          color: serie.color,
          name: serie.name,
        });

        mappedPoints.push([x, y]);

        // Construir el path
        if (index === 0) {
          path = `M ${x},${y}`;
        } else {
          path += ` L ${x},${y}`;
        }
      });

      this.linePaths.push({
        path,
        color: serie.color,
        name: serie.name,
      });
    });
  }

  // Función para mapear un valor de datos a píxeles
  mapValueToPixel(
    value: number,
    rangeMin: number,
    rangeMax: number,
    pixelMin: number,
    pixelMax: number
  ): number {
    return (
      pixelMin +
      ((value - rangeMin) / (rangeMax - rangeMin)) * (pixelMax - pixelMin)
    );
  }

  // Función para formatear números grandes
  formatValue(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  }
}
