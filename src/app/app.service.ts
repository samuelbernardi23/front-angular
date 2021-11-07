import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  urlApi(): any {
    if (process && process.env && process.env.BASE_URL) {
      console.log('.env ' + process.env.BASE_URL);
      return process.env.BASE_URL;

    } else {
      console.log('environment.prod ' + environment.api);
      return environment.api;

    }
  }
}
