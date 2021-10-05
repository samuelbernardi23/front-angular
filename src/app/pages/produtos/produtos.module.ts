import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRountingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos.component';
import { DxDataGridModule, DxSpeedDialActionModule, DxPopupModule, DxFormModule } from 'devextreme-angular';
import { ItensFormService } from '../../shared/services/itens-form.service';

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
    DxFormModule
  ],
  providers:[
    ItensFormService
  ]
})
export class ProdutosModule { }
