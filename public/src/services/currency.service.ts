import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { Currency } from '../lib/types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private cookieService: CookieService) {}

  async getCurrencies(): Promise<Currency[] | null> {
    const get = await fetch(URL_BACKEND + '/api/Currency/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Currency[] = await get.json();

    return response;
  }

  async getCurrency(id: string): Promise<Currency | null> {
    const get = await fetch(URL_BACKEND + '/api/Currency/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Currency = await get.json();

    return response;
  }

  async getCurrencyByCode(code: string): Promise<Currency | null> {
    const get = await fetch(URL_BACKEND + '/api/Currency/code/' + code, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Currency = await get.json();
    console.log(response)

    return response;
  }

  async createCurrency(currency: Currency): Promise<Currency | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const post = await fetch(URL_BACKEND + '/api/Currency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        name: currency.name,
        code: currency.code,
        imageUrl: currency.imageUrl,
        value: currency.value,
      }),
    });

    if (post.status !== 200) {
      return null;
    }

    const response: Currency = await post.json();

    return response;
  }

  async updateCurrency(currency: Currency): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const put = await fetch(URL_BACKEND + '/api/Currency/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        currencyId: currency.id,
        name: currency.name,
        code: currency.code,
        imageUrl: currency.imageUrl,
        value: currency.value,
      }),
    });

    if (put.status !== 200) {
      return false;
    }

    return true;
  }

  async deleteCurrency(id: number): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }
    const del = await fetch(URL_BACKEND + '/api/Currency/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (del.status !== 200) {
      return false;
    }

    return true;
  }

  async getCurrenciesCount(): Promise<number> {
    const get = await fetch(URL_BACKEND + '/api/Currency/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response: number = await get.json();

    return response;
  }

  async getCurrenciesPage(page: number): Promise<Currency[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }
    const get = await fetch(URL_BACKEND + '/api/Currency/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Currency[] = await get.json();

    return response;
  }
}