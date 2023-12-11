import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion, Currency } from '../../lib/types';
import { ConversionsService } from '../../services/conversions.service';
import { CurrencyService } from '../../services/currency.service';
import { formatDateExtra } from '../../lib/util';

@Component({
  selector: 'app-table-conversions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-conversions.component.html',
  styleUrl: './table-conversions.component.css',
})
export class TableConversionsComponent implements OnInit {
  @Input() conversions: Conversion[] = [];

  foreings: Currency[] = [];
  page: number = 1;
  maxPages: number = 0;

  loaded: boolean = false;

  constructor(
    private conversionsService: ConversionsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    //max pages
    setTimeout(() => {
      this.conversionsService
        .getConversionsCount()
        .then((count) => {
          if (count) {
            this.maxPages = Math.ceil(count / 10);
          }
        })
        .then(() => {
          this.currencyService.getCurrencys().then((foreings) => {
            if (foreings) {
              this.foreings = foreings;
            }
          });
        })
        .finally(() => {
          this.loaded = true;
        });
    }, 1000);
  }

  formatDate(date: Date): string {
    return formatDateExtra(date);
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.conversionsService
        .getConversionsPage(this.page)
        .then((conversions) => {
          if (conversions) {
            this.conversions = conversions;
          }
        });
    }
  }

  next() {
    if (this.page < this.maxPages) {
      this.page++;
      this.conversionsService
        .getConversionsPage(this.page)
        .then((conversions) => {
          if (conversions) {
            this.conversions = conversions;
          }
        });
    }
  }
}
