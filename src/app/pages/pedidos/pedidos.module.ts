import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxPopupModule, DxSpeedDialActionModule, DxFormModule } from 'devextreme-angular';
import { PedidosComponent } from './pedidos.component';
import { PedidosRountingModule } from './pedidos.routing';

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
    DxFormModule
  ]
})
export class PedidosModule { }
