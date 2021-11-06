import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidosModel } from '../models/pedidos.model';
import { AppService } from '../../../../app.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  api!: string | number;

  constructor(private _appService: AppService, private _http: HttpClient) {
    this.api = this._appService.urlApi();
  }

  fetchPedidos(): Observable<PedidosModel[]> {
    return <Observable<PedidosModel[]>>this._http.get(`${this.api}/pedidos`);
  }

  storePedido(pedido: PedidosModel): Observable<PedidosModel> {
    return <Observable<PedidosModel>>this._http.post(`${this.api}/pedidos`, pedido);
  }

  updatePedido(pedido: PedidosModel): Observable<PedidosModel> {
    return <Observable<PedidosModel>>this._http.patch(`${this.api}/pedidos`, pedido);
  }

  removePedido(pedido_id: number): Observable<PedidosModel> {
    return <Observable<PedidosModel>>this._http.delete(`${this.api}/pedidos/${pedido_id}`);
  }

}
