import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
  legend: ApexLegend;
};

@Component({
  selector: 'hwa-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit {
  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    toolbar: {
      tools: {
        selection: false,
      },
    },
    markers: {
      size: 6,
      hover: {
        size: 10,
      },
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd-MMM',
      },
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 6,
      decimalsInFloat: 0,
    },
  };

  constructor() {
    this.initCharts();
  }

  public initCharts(): void {
    this.chart1options = {
      series: [
        {
          name: 'Systole',
          data: this.generateDayWiseTimeSeries(new Date('03 Jul 2020'), [
            120,
            119,
            119,
          ]),
        },
      ],
      title: {
        text: 'Systole',
      },
      chart: {
        id: 'systole',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#008FFB'],
      yaxis: {
        labels: {
          minWidth: 40,
        },
      },
    };

    this.chart2options = {
      series: [
        {
          name: 'Diastole',
          data: this.generateDayWiseTimeSeries(new Date('03 Jul 2020'), [
            81,
            80,
            80,
          ]),
        },
      ],
      title: {
        text: 'Diastole',
      },
      chart: {
        id: 'diastole',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#546E7A'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };

    this.chart3options = {
      series: [
        {
          name: 'Heart rate',
          data: this.generateDayWiseTimeSeries(new Date('03 Jul 2020'), [
            88,
            79,
            80,
          ]),
        },
      ],
      title: {
        text: 'Heart rate',
      },
      chart: {
        id: 'heart-rate',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#00E396'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };
  }

  public generateDayWiseTimeSeries(startDate: Date, readings: number[]): any[] {
    const series: any[] = [];
    let start = startDate.getTime();
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    readings.forEach((reading) => {
      const x = start;
      series.push([x, reading]);

      start += 86400000;
    });
    return series;
  }

  ngOnInit(): void {}
}
