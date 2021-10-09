import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../../app.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProdutosModel } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  api!: string;

  constructor(private _http: HttpClient, private _appService: AppService) {
    this.api = this._appService.urlApi();
  }


  fetchProdutos(): Observable<ProdutosModel[]> {
    return <Observable<ProdutosModel[]>>this._http.get(`${this.api}/produtos`);
  }

  storeProduto(produto: ProdutosModel): Observable<ProdutosModel[]> {
    return <Observable<ProdutosModel[]>>this._http.post(`${this.api}/produtos`, produto);
  }

  updateProduto(produto: ProdutosModel): Observable<ProdutosModel[]> {
    return <Observable<ProdutosModel[]>>this._http.patch(`${this.api}/produtos`, produto);
  }

  deleteProduto(produto: ProdutosModel): Observable<ProdutosModel[]> {
    return <Observable<ProdutosModel[]>>this._http.delete(`${this.api}/produtos/${produto.id}`);
  }
}
