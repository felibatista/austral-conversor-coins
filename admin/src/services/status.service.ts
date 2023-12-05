import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor() {}

  async getStatus() {
    let _api = await fetch(URL_BACKEND).then((res) => {
      return true;
    });
    let _database = true; //TODO: Check database connection
    let _public = await fetch('https://public.localhost:3002')
      .then((res) => res.ok)
      .catch((err) => {
        console.log(err);
        return false;
      });
    let _admin = true;

    return {
      api: _api,
      database: _database,
      public: _public,
      admin: _admin,
    };
  }
}
