import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { ItemsPedidoModel } from '../models/items-pedido.model';
import { PedidosModel } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsPedidoService {
  api!: string | number;

  constructor(private _appService: AppService, private _http: HttpClient) {
    this.api = this._appService.urlApi();
  }

  fetchItemsPedido(pedido_id: number): Observable<ItemsPedidoModel[]> {
    return <Observable<ItemsPedidoModel[]>>this._http.get(`${this.api}/itempedidos/${pedido_id}`)
  }

}
