import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor() {}

  async getStatus() {
    let _api = await fetch(URL_BACKEND).then(() => {
      return true;
    });
    let _database = await fetch(URL_BACKEND).then(() => {
      return true;
    });
    let _public = await fetch('http://localhost:4300')
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
