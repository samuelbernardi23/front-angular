import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  dataSource = [
    {
      "id": 5,
      "cliente_id": 2,
      "cliente_nome":"Samuel Lucas Bernardi",
      "valor_total": "20000.00",
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
