import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion, Currency } from '../../lib/types';

@Component({
  selector: 'app-dashboard-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-currencies.component.html',
  styleUrl: './dashboard-currencies.component.css'
})
export class DashboardCurrenciesComponent implements OnInit {
  @Input() currencies: Currency[] = [];
  @Input() userConversions: Conversion[] = [];
  @Input() loading: boolean = true;

  sortedCurrencies: Currency[] = [];
  
  ngOnInit(): void {
    this.sortedCurrencies = this.sortByMostUsed();
  }

  sortByMostUsed(): Currency[] {
    const topCurrencies: Map<Currency, number> = new Map();
    const currencies = this.currencies;
    const userConversions = this.userConversions;

    currencies.forEach((currency) => {
      const currencyConversions = userConversions.filter((conversion) => {
        return conversion.fromCurrency.id === currency.id || conversion.toCurrency.id === currency.id;
      });

      topCurrencies.set(currency, currencyConversions.length);
    });

    topCurrencies[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    };

    let formattedTopCurrencies = [];

    for (const [currency, timesUsed] of topCurrencies) {
      formattedTopCurrencies.push(currency);
    }

    console.log(formattedTopCurrencies);

    return formattedTopCurrencies;
  }

  getPosition(number: number): Currency{
    return this.sortedCurrencies[number - 1];
  }

  getTimesUsed(currency: Currency): number {
    const userConversions = this.userConversions;
    const currencyConversions = userConversions.filter((conversion) => {
      return conversion.fromCurrency.id === currency.id || conversion.toCurrency.id === currency.id;
    });

    return currencyConversions.length;
  }
}



