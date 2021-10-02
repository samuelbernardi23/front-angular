import { Component } from '@angular/core';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'produtos.component.html'
})

export class ProdutosComponent {
  dataSource = [
    {
      "id": 1,
      "nome": "Millenium Falcon",
      "preco_unitario": 550000.76,
      "multiplo": null
    },
    {
      "id": 2,
      "nome": "X-Wing",
      "preco_unitario": 60000.25,
      "multiplo": 2
    },
    {
      "id": 3,
      "nome": "Super Star Destroyer",
      "preco_unitario": 4570000.05,
      "multiplo": null
    },
    {
      "id": 4,
      "nome": "TIE Fighter",
      "preco_unitario": 75000,
      "multiplo": 2
    },
    {
      "id": 5,
      "nome": "Lightsaber",
      "preco_unitario": 6000,
      "multiplo": 5
    }
  ]

  constructor() {
  }
}
