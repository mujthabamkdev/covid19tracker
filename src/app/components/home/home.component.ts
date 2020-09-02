import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }
  constructor(private dataService: DataServiceService) { }


  initChart(caseType: string) {
    let datatable = [];
    datatable.push(["Country", "Cases"])

    this.globalData.forEach(cs => {

      let typeValue: number;

      if (caseType == 'c') {
        if (!Number.isNaN(cs.confirmed)) {
          if (cs.confirmed > 2000) { typeValue = cs.confirmed }
        }
      }
      if (caseType == 'd') {
        if (cs.deaths > 2000) { typeValue = cs.deaths }
      }

      if (caseType == 'a') {
        if (cs.active > 2000) { typeValue = cs.active }
      }

      if (caseType == 'r') {
        if (cs.recovered > 2000) { typeValue = cs.recovered }
      }

      datatable.push([cs.country, typeValue])

    })


    this.pieChart = {
      chartType: "PieChart",
      dataTable: datatable,
      options: {
        height: 500,
      }
    }
    this.columnChart = {
      chartType: "ColumnChart",
      dataTable: datatable,
      options: {
        height: 500,
      }
    }
  }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        this.globalData = result;
        result.forEach(cs => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += Math.ceil(cs.confirmed);
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
        this.initChart('c');
      }
    })
  }


  updateChart(input: HTMLInputElement) {
    this.initChart(input.value);
  }
}
