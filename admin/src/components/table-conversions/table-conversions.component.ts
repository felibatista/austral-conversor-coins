import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion, Foreing } from '../../lib/types';
import { ConversionsService } from '../../services/conversions.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-table-conversions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-conversions.component.html',
  styleUrl: './table-conversions.component.css',
})
export class TableConversionsComponent implements OnInit {
  @Input() conversions: Conversion[] = [];

  foreings: Foreing[] = [];
  page: number = 1;
  maxPages: number = 0;

  loaded: boolean = false;

  constructor(
    private conversionsService: ConversionsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    //max pages
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
  }

  fromIdToName(id: number): string {
    let name: string = '';
    this.foreings.forEach((foreing) => {
      if (foreing.id === id) {
        name = foreing.code;
      }
    });
    return name;
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
