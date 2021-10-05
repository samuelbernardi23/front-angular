import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { SaveButton } from 'src/app/shared/services/itens-form.service';
import { ItensFormService } from '../../shared/services/itens-form.service';

@Component({
  templateUrl: 'produtos.component.html'
})

export class ProdutosComponent {
  popupVisible!: boolean;
  formData!: any;
  buttonOptions!:SaveButton;  

  dataSource = [];

  constructor(private _form: ItensFormService) {
    this.buttonOptions = this._form.saveButton();
  }

  togglePopup() {
    this.popupVisible = !this.buttonOptions;
  }

  onFormSubmit = (event: Event) => {
    event.preventDefault();
    this._form.notify("Produto cadastrado com sucesso.");

    this.formData = {};
    this.togglePopup();
  }
}
