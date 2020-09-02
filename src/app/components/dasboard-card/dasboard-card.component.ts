import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dasboard-card',
  templateUrl: './dasboard-card.component.html',
  styleUrls: ['./dasboard-card.component.css']
})
export class DasboardCardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;

  @Input('totalDeaths')
  totalDeaths;

  @Input('totalRecovered')
  totalRecovered;

  @Input('totalActive')
  totalActive;

  constructor() { }

  ngOnInit() {
  }

}
