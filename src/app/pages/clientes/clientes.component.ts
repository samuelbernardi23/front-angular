import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesModel } from './core/models/clientes.model';
import { ClientesService } from './core/services/clientes.service';
import { ItensFormService } from '../../shared/services/itens-form.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild('dxDataGrid', { read: DxDataGridComponent, static: true }) dxDataGrid!: DxDataGridComponent;
  popupVisible!: boolean;
  customer!: ClientesModel;
  buttonOptions!: any;

  dataSource!: ClientesModel[];

  constructor(private _clientesService: ClientesService, private _itensForm: ItensFormService) {
  }

  ngOnInit() {
    this.fetchClientes();
    this.buttonOptions = this._itensForm.saveButton();
  }

  fetchClientes() {
    this._clientesService.fetchClientes().subscribe((clientes: ClientesModel[]) => {
      this.dataSource = clientes;
    });
  }

  onFormSubmit = (event: Event) => {
    event.preventDefault();

    this.storeCliente(this.customer);
  }

  storeCliente(cliente: ClientesModel) {

    this._clientesService.storeCliente(cliente).subscribe((res) => {

      this._itensForm.notify(`Cliente cadastrado com sucesso.`);

      this.fetchClientes();
    });
  }

  updateCliente(cliente: ClientesModel) {
    this._clientesService.updateCliente(cliente).subscribe((res) => {

      this._itensForm.notify(`Cliente atualizado com sucesso.`);

      this.fetchClientes();
    });

  }
  removeCliente(cliente: ClientesModel) {
    this._clientesService.removeCliente(cliente).subscribe((res) => {

      this._itensForm.notify(`Cliente removido com sucesso.`);

      this.fetchClientes();
    }, (error) => {

      this._itensForm.notify(error.error.message);
      this.fetchClientes();
    });

  }
}
