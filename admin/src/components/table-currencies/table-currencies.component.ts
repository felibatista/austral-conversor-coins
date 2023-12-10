import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency, User } from '../../lib/types';
import { CurrencyService } from '../../services/currency.service';
import { EditCurrencyComponent } from '../edit-currency/edit-currency.component';

@Component({
  selector: 'app-table-currencies',
  standalone: true,
  imports: [CommonModule, EditCurrencyComponent],
  templateUrl: './table-currencies.component.html',
  styleUrl: './table-currencies.component.css',
})
export class TableCurrenciesComponent implements OnInit {
  @Input() currencies: Currency[] = [];

  page: number = 1;
  maxPages: number = 0;

  loaded: boolean = false;

  currencyToEdit: Currency = {
    id: 0,
    code: '',
    name: '',
    value: 0,
    imageUrl: '',
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    //max pages
    setTimeout(() => {
      this.currencyService
        .getCurrenciesCount()
        .then((count) => {
          if (count) {
            this.maxPages = Math.ceil(count / 10);
          }
        })
        .finally(() => {
          this.loaded = true;
        });
    }, 1000);
  }

  editCurrency(currency: Currency) {
    this.currencyToEdit = currency;
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.currencyService.getCurrenciesPage(this.page).then((currencies) => {
        if (currencies) {
          this.currencies = currencies;
        }
      });
    }
  }

  next() {
    if (this.page < this.maxPages) {
      this.page++;
      this.currencyService.getCurrenciesPage(this.page).then((currencies) => {
        if (currencies) {
          this.currencies = currencies;
        }
      });
    }
  }
}
