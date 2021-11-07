import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  urlApi(): any {
      console.log('environment.prod ' + environment.api);
      return environment.api;
  }
}
