import { Component } from '@angular/core';
import { ItensFormService, SaveButton } from 'src/app/shared/services/itens-form.service';

@Component({
  templateUrl: 'pedidos.component.html',
})
export class PedidosComponent {
  popupVisible!: boolean;
  formData!: any;
  buttonOptions!: SaveButton;
  clientes: any = [];

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
