import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-19-2020.csv'
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let raw = {}
        let rows = result.split('\n')
        rows.splice(0, 1)
        rows.forEach(row => {
          let cols = row.split(',');
          //need to correct column mapping sometimes index mismatching 
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[8],
          }
          let temp: GlobalDataSummary = raw[cs.country]
          if (temp) {
            if (cs.confirmed % 1 == 0) {
              temp.active = cs.active + temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths + temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;
              raw[cs.country] = temp;
            }
          }
          else {
            if (cs.confirmed % 1 == 0) {
              raw[cs.country] = cs;
            }
          }
        });

        return <GlobalDataSummary[]>Object.values(raw)
      })
    )
  }
}
