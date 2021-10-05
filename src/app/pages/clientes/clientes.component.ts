import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  popupVisible!: boolean;
  customer!: any;
  buttonOptions: any = {
    text: "Salvar",
    type: "success",
    useSubmitBehavior: true,
    height: "60",
  }

  dataSource = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onFormSubmit = function (event: Event) {
    notify({
      message: "Cliente cadastrado com sucesso.",
      position: {
        my: "center center",
        at: "center center"
      }
    }, "success", 4000);

    event.preventDefault();
  }
}
