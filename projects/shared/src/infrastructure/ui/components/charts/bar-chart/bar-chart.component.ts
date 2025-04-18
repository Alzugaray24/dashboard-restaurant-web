import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartSeries {
  name: string;
  data: BarChartData[];
  color: string;
}

@Component({
  selector: 'lib-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() data: BarChartData[] = [];
  @Input() series: BarChartSeries[] = [];
  @Input() width: number = 500;
  @Input() height: number = 300;
  @Input() showGrid: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() vertical: boolean = true; // true para vertical, false para horizontal
  @Input() title: string = '';
  @Input() padding: number = 40;
  @Input() barPadding: number = 4;
  @Input() defaultColor: string = '#3b82f6'; // Azul por defecto

  // Variables para el SVG
  viewBox: string = '';
  chartWidth: number = 0;
  chartHeight: number = 0;
  maxValue: number = 0;
  gridLines: number[] = [];
  barGroups: {
    name: string;
    bars: {
      x: number;
      y: number;
      width: number;
      height: number;
      value: number;
      color: string;
      label: string;
    }[];
  }[] = [];

  ngOnInit() {
    this.calculateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['data'] ||
      changes['series'] ||
      changes['width'] ||
      changes['height'] ||
      changes['vertical'] ||
      changes['padding']
    ) {
      this.calculateChart();
    }
  }

  calculateChart() {
    this.chartWidth = this.width - this.padding * 2;
    this.chartHeight = this.height - this.padding * 2;
    this.viewBox = `0 0 ${this.width} ${this.height}`;

    // Determinar si usamos datos simples o series
    const useSeries = this.series && this.series.length > 0;

    // Calcular el valor máximo
    if (useSeries) {
      this.maxValue = Math.max(
        ...this.series.flatMap((s) => s.data.map((d) => d.value))
      );
    } else {
      this.maxValue = Math.max(...this.data.map((d) => d.value));
    }

    // Ajustar para mejor visualización
    this.maxValue = this.maxValue * 1.1;

    // Generar líneas de la grilla
    this.generateGridLines();

    // Calcular dimensiones y posiciones de las barras
    if (useSeries) {
      this.calculateSeriesBars();
    } else {
      this.calculateSimpleBars();
    }
  }

  generateGridLines() {
    this.gridLines = [];
    const numLines = 5;

    for (let i = 0; i <= numLines; i++) {
      const value = (i / numLines) * this.maxValue;
      this.gridLines.push(value);
    }
  }

  calculateSimpleBars() {
    this.barGroups = [];
    const totalBars = this.data.length;

    if (totalBars === 0) return;

    // Calcular ancho de cada barra considerando el padding
    const barWidth = this.vertical
      ? this.chartWidth / totalBars - this.barPadding
      : this.chartWidth;

    // Calcular la altura máxima para las barras
    const maxBarHeight = this.vertical
      ? this.chartHeight
      : this.chartHeight / totalBars - this.barPadding;

    const bars = this.data.map((item, index) => {
      const value = Math.min(item.value, this.maxValue);
      const ratio = value / this.maxValue;

      // Para gráficos verticales
      if (this.vertical) {
        const barHeight = ratio * maxBarHeight;
        const x = this.padding + index * (barWidth + this.barPadding);
        const y = this.height - this.padding - barHeight;

        return {
          x,
          y,
          width: barWidth,
          height: barHeight,
          value: item.value,
          color: item.color || this.defaultColor,
          label: item.label,
        };
      }
      // Para gráficos horizontales
      else {
        const barHeight = this.chartHeight / totalBars - this.barPadding;
        const barLength = ratio * this.chartWidth;
        const x = this.padding;
        const y = this.padding + index * (barHeight + this.barPadding);

        return {
          x,
          y,
          width: barLength,
          height: barHeight,
          value: item.value,
          color: item.color || this.defaultColor,
          label: item.label,
        };
      }
    });

    this.barGroups = [{ name: 'data', bars }];
  }

  calculateSeriesBars() {
    this.barGroups = [];
    const totalGroups = this.vertical
      ? Math.max(...this.series.map((s) => s.data.length))
      : this.series.length;

    const seriesCount = this.series.length;

    if (totalGroups === 0 || seriesCount === 0) return;

    // Para cada serie
    if (this.vertical) {
      // Gráficos verticales - agrupar series por categoría
      const groupWidth = this.chartWidth / totalGroups - this.barPadding;
      const barWidth = groupWidth / seriesCount - this.barPadding;

      // Obtener todas las etiquetas únicas
      const allLabels = new Set<string>();
      this.series.forEach((serie) => {
        serie.data.forEach((item) => {
          allLabels.add(item.label);
        });
      });

      // Para cada etiqueta única, crear un grupo de barras
      const labelsArray = Array.from(allLabels);

      labelsArray.forEach((label, groupIndex) => {
        const bars = this.series
          .map((serie, serieIndex) => {
            const dataItem = serie.data.find((d) => d.label === label);

            if (!dataItem) return null;

            const value = Math.min(dataItem.value, this.maxValue);
            const ratio = value / this.maxValue;
            const barHeight = ratio * this.chartHeight;

            const x =
              this.padding +
              groupIndex * (groupWidth + this.barPadding) +
              serieIndex * (barWidth + this.barPadding);
            const y = this.height - this.padding - barHeight;

            return {
              x,
              y,
              width: barWidth,
              height: barHeight,
              value: dataItem.value,
              color: dataItem.color || serie.color,
              label: dataItem.label,
            };
          })
          .filter((bar) => bar !== null) as any[];

        this.barGroups.push({
          name: label,
          bars: bars,
        });
      });
    } else {
      // Gráficos horizontales - cada serie es una fila
      const barHeight = this.chartHeight / totalGroups - this.barPadding;

      this.series.forEach((serie, groupIndex) => {
        const bars = serie.data.map((item, dataIndex) => {
          const value = Math.min(item.value, this.maxValue);
          const ratio = value / this.maxValue;
          const barLength = ratio * this.chartWidth;

          const x = this.padding;
          const y = this.padding + groupIndex * (barHeight + this.barPadding);

          return {
            x,
            y,
            width: barLength,
            height: barHeight,
            value: item.value,
            color: item.color || serie.color,
            label: item.label,
          };
        });

        this.barGroups.push({
          name: serie.name,
          bars: bars,
        });
      });
    }
  }

  // Función para formatear números grandes
  formatValue(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  }
}
