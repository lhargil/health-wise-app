import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexChart,
  ApexLegend,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; // ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; // ApexGrid;
  colors: any;
  toolbar: any;
  legend: ApexLegend;
  noData: any;
};

@Component({
  selector: 'hwa-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartWrapperComponent implements OnInit {
  @ViewChild('chartInstance', { static: true }) chartInstance: ChartComponent;
  @Input()
  public chartOptions: Partial<ChartOptions>;
  @Input()
  public commonOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnInit(): void {}
}
