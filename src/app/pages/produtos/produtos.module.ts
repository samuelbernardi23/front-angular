import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRountingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    ProdutosRountingModule,
    CommonModule,
    DxDataGridModule
  ]
})
export class ProdutosModule { }
