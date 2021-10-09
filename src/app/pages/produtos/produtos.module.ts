import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRountingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos.component';
import { DxDataGridModule, DxSpeedDialActionModule, DxPopupModule, DxFormModule } from 'devextreme-angular';
import { ItensFormService } from '../../shared/services/itens-form.service';
import { ProdutosService } from './core/services/produtos.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    ProdutosRountingModule,
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    HttpClientModule
  ],
  providers:[
    ItensFormService,
    ProdutosService
  ]
})
export class ProdutosModule { }
