import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PieChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'lib-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() data: PieChartData[] = [];
  @Input() size: number = 200;
  @Input() donut: boolean = false;
  @Input() donutWidth: number = 40;
  @Input() showLabels: boolean = true;
  @Input() showValue: boolean = true;
  @Input() title: string = '';
  @Input() centerLabel: string = '';

  // Variables para los cálculos del SVG
  chartData: {
    path: string;
    transform: string;
    color: string;
    label?: string;
    value?: number;
    percentage?: string;
    labelPosition?: { x: number; y: number };
  }[] = [];

  center: number = 0;
  radius: number = 0;

  ngOnInit() {
    this.calculatePieChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['data'] ||
      changes['size'] ||
      changes['donut'] ||
      changes['donutWidth']
    ) {
      this.calculatePieChart();
    }
  }

  calculatePieChart() {
    this.center = this.size / 2;
    this.radius = this.donut
      ? this.center - this.donutWidth / 2
      : this.center * 0.8;

    const innerRadius = this.donut ? this.center - this.donutWidth : 0;

    // Calcular el total para obtener porcentajes
    const total = this.data.reduce((sum, item) => sum + item.value, 0);

    // Generar los paths para cada segmento del pie chart
    this.chartData = [];
    let startAngle = 0;

    this.data.forEach((segment, index) => {
      const percentage = segment.value / total;
      const angle = percentage * 2 * Math.PI;
      const endAngle = startAngle + angle;

      // Calcular puntos para el arco
      const startX = this.center + this.radius * Math.cos(startAngle);
      const startY = this.center + this.radius * Math.sin(startAngle);
      const endX = this.center + this.radius * Math.cos(endAngle);
      const endY = this.center + this.radius * Math.sin(endAngle);

      // Determinar si el arco es mayor a 180 grados (pi radianes)
      const largeArcFlag = angle > Math.PI ? 1 : 0;

      // Crear el path SVG para el segmento
      const path = [
        `M ${this.center},${this.center}`,
        `L ${startX},${startY}`,
        `A ${this.radius},${this.radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
        'Z',
      ].join(' ');

      // Calcular la posición del label
      const labelAngle = startAngle + angle / 2;
      const labelDistance = this.radius * 0.7;
      const labelX = this.center + labelDistance * Math.cos(labelAngle);
      const labelY = this.center + labelDistance * Math.sin(labelAngle);

      this.chartData.push({
        path,
        transform: `translate(0, 0)`,
        color: segment.color,
        label: segment.label,
        value: segment.value,
        percentage: `${Math.round(percentage * 100)}%`,
        labelPosition: { x: labelX, y: labelY },
      });

      startAngle = endAngle;
    });
  }
}
