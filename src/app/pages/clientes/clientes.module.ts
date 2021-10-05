import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { DxDataGridModule } from 'devextreme-angular';
import { ClientesRountingModule } from './clientes.routing';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    ClientesRountingModule,
    CommonModule,
    DxDataGridModule
  ]
})
export class ClientesModule { }
