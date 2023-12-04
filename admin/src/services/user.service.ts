import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private cookieService: CookieService) {}

  async getUsersCount(): Promise<number | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + "/api/User/counter", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: number = await get.json();

    return response;
  }
}
