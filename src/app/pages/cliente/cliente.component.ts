import { Component } from '@angular/core';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'cliente.component.html'
})

export class ClienteComponent {
  dataSource = [
    {
      "id": 1,
      "nome": "Lyon Martins"
    },
    {
      "id": 2,
      "nome": "Samuel Lucas Bernardi"
    }
  ]

  constructor() {
  }
}
