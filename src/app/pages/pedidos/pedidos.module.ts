import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxPopupModule, DxSpeedDialActionModule, DxFormModule } from 'devextreme-angular';
import { PedidosComponent } from './pedidos.component';
import { PedidosRountingModule } from './pedidos.routing';
import { ClientesService } from '../clientes/core/services/clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { ProdutosService } from '../produtos/core/services/produtos.service';
import { ItensFormService } from '../../shared/services/itens-form.service';
import { PedidosService } from './core/services/pedidos.service';
import { ItemsPedidoService } from './core/services/items-pedido.service';

@NgModule({
  declarations: [
    PedidosComponent
  ],
  imports: [
    PedidosRountingModule,
    CommonModule,
    DxDataGridModule,
    DxPopupModule,
    DxSpeedDialActionModule,
    DxFormModule,
    HttpClientModule,
    DxDataGridModule
  ],
  providers:[
    ClientesService,
    ProdutosService,
    ItensFormService,
    PedidosService,
    ItemsPedidoService
  ]
})
export class PedidosModule { }
