import { Component, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { SaveButton } from 'src/app/shared/services/itens-form.service';
import { ItensFormService } from '../../shared/services/itens-form.service';
import { ProdutosService } from './core/services/produtos.service';
import { ProdutosModel } from './core/models/produtos.model';

@Component({
  templateUrl: 'produtos.component.html'
})

export class ProdutosComponent implements OnInit {
  popupVisible!: boolean;
  formData!: any;
  buttonOptions!: SaveButton;

  dataSource: ProdutosModel[] = [];

  constructor(private _itensForm: ItensFormService, private _produtosService: ProdutosService) {
    this.buttonOptions = this._itensForm.saveButton();
  }
  ngOnInit(): void {
    this.fetchProdutos();
  }

  togglePopup() {
    this.popupVisible = !this.buttonOptions;
  }

  onFormSubmit = (event: Event) => {
    event.preventDefault();
    this._itensForm.notify("Produto cadastrado com sucesso.");

    this.formData = {};
    this.togglePopup();
  }

  fetchProdutos() {
    this._produtosService.fetchProdutos().subscribe((produtos: ProdutosModel[]) => {
      this.dataSource = produtos;
    });
  }

  storeProduto(produto: ProdutosModel) {
    this._produtosService.storeProduto(produto).subscribe((res) => {

      this._itensForm.notify(`Produto cadastrado com sucesso.`);

      this.fetchProdutos();
    });
  }

  updateProduto(produto: ProdutosModel) {
    this._produtosService.updateProduto(produto).subscribe((res) => {

      this._itensForm.notify(`Produto atualizado com sucesso.`);

      this.fetchProdutos();
    });

  }

  deleteProduto(produto: ProdutosModel) {
    console.log(produto);

    this._produtosService.deleteProduto(produto).subscribe((res) => {

      this._itensForm.notify(`Produto excluído com sucesso.`);

      this.fetchProdutos();
    }, (error) => {

      this._itensForm.notify(error.error.message);
      this.fetchProdutos();
    });

  }

}
