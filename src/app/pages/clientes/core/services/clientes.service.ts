import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesModel } from '../models/clientes.model';
import { AppService } from '../../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url!: string | number;

  constructor(private _http: HttpClient, private _appSerive: AppService) {
    this.url = this._appSerive.urlApi()
  }

  fetchClientes(): Observable<ClientesModel[]> {
    return <Observable<ClientesModel[]>>this._http.get(`${this.url}/clientes`);
  }
  
  storeCliente(cliente: ClientesModel): Observable<ClientesModel> {
    return <Observable<ClientesModel>>this._http.post(`${this.url}/clientes`, cliente);
  }

  updateCliente(cliente: ClientesModel): Observable<ClientesModel> {
    return <Observable<ClientesModel>>this._http.patch(`${this.url}/clientes`, cliente);
  }

  removeCliente(cliente: ClientesModel): Observable<ClientesModel> {
    return <Observable<ClientesModel>>this._http.delete(`${this.url}/clientes/${cliente.id}`);
  }

}
