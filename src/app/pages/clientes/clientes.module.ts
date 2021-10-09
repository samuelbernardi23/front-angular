import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { DxDataGridModule, DxPopupModule, DxSpeedDialActionModule, DxFormModule } from 'devextreme-angular';
import { ClientesRountingModule } from './clientes.routing';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ClientesService } from './core/services/clientes.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    HttpClientModule,
    ClientesRountingModule,
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule  
  ],
  providers:[
    ClientesService
  ]
})
export class ClientesModule { }
