import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { DxDataGridModule, DxPopupModule, DxSpeedDialActionModule, DxFormModule } from 'devextreme-angular';
import { ClientesRountingModule } from './clientes.routing';
import { DxButtonModule } from 'devextreme-angular/ui/button';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    ClientesRountingModule,
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule  
  ]
})
export class ClientesModule { }
