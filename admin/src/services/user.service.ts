import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  async getUsers(): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersPage(page: number): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersCount(): Promise<number | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/counter', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: number = await get.json();

    return response;
  }
}
