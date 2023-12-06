import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { Foreing } from '../lib/types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private cookieService: CookieService) {}

  async getCurrencys(): Promise<Foreing[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Foreing/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Foreing[] = await get.json();

    return response;
  }

  async getCurrency(id: string): Promise<Foreing | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Foreing/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Foreing = await get.json();

    return response;
  }

  async createCurrency(currency: Foreing): Promise<Foreing | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const post = await fetch(URL_BACKEND + '/api/Foreing', {
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

    const response: Foreing = await post.json();

    return response;
  }

  async updateCurrency(currency: Foreing): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const put = await fetch(URL_BACKEND + '/api/Foreing/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify(currency),
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
    const del = await fetch(URL_BACKEND + '/api/Foreing/' + id, {
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
    if (!this.cookieService.get('token')) {
      return 0;
    }

    const get = await fetch(URL_BACKEND + '/api/Foreing/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response: number = await get.json();

    return response;
  }

  async getCurrenciesPage(page: number): Promise<Foreing[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }
    const get = await fetch(URL_BACKEND + '/api/Foreing/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Foreing[] = await get.json();

    return response;
  }
}
