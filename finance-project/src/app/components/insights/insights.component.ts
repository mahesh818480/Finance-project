import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent {

  highestCategory = '';

  constructor(private dataService: DataService) {
    // this.dataService.transactions$.subscribe(data => {
    //   const map: any = {};

    //   data.forEach(t => {
    //     if (t.type === 'expense') {
    //       map[t.category] = (map[t.category] || 0) + t.amount;
    //     }
    //   });

    //   this.highestCategory = Object.keys(map)
    //     .reduce((a, b) => map[a] > map[b] ? a : b, '');
    // });
  }
}