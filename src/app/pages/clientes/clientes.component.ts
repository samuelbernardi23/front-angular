import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
