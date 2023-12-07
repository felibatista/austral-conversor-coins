import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [

  ]
})
export class HeroComponent implements OnInit {
  currencyCount: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrenciesCount().then((count) => {
      if (count){
        this.currencyCount = count
      }
    });
  }

}
