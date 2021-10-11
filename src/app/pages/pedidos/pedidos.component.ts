import { Component, OnInit, ViewChild } from '@angular/core';
import { ItensFormService, SaveButton } from 'src/app/shared/services/itens-form.service';
import { ClientesService } from '../clientes/core/services/clientes.service';
import { ClientesModel } from '../clientes/core/models/clientes.model';
import { PedidosModel } from './core/models/pedidos.model';
import { ProdutosService } from '../produtos/core/services/produtos.service';
import { ProdutosModel } from '../produtos/core/models/produtos.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { ItemsPedidoModel } from './core/models/items-pedido.model';
import { PedidosService } from './core/services/pedidos.service';
import { ItemsPedidoService } from './core/services/items-pedido.service';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  templateUrl: 'pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  @ViewChild('dxDataGridItens', { read: DxDataGridComponent, static: false }) dxDataGridItens!: DxDataGridComponent;

  popupVisible: boolean = false;
  formDataPedido: PedidosModel = new PedidosModel();
  buttonOptions!: SaveButton;
  clientes: ClientesModel[] = [];
  dataSourceItens: ItemsPedidoModel[] = [];
  produtos: ProdutosModel[] = [];
  dataSource: PedidosModel[] = [];

  titlePopup: string = "Adicionar pedido";
  selectedRow!: boolean;

  operation!: string;

  constructor(
    private _form: ItensFormService,
    private _clienteService: ClientesService,
    private _produtosService: ProdutosService,
    private _itensForm: ItensFormService,
    private _pedidosService: PedidosService,
    private _itemsPedidoService: ItemsPedidoService,
  ) {
    this.buttonOptions = this._form.saveButton();
  }

  ngOnInit(): void {
    this.fetchPedidos();
    this.fetchClientes();
    this.fetchProdutos();
  }


  fetchClientes() {
    this._clienteService.fetchClientes().subscribe((clientes: ClientesModel[]) => {
      this.clientes = clientes;
    });
  }

  fetchProdutos() {
    this._produtosService.fetchProdutos().subscribe((produtos: ProdutosModel[]) => {
      this.produtos = produtos;
    });
  }

  fetchItemsPedido(pedido: PedidosModel) {
    this._itemsPedidoService.fetchItemsPedido(pedido.id).subscribe((items: ItemsPedidoModel[]) => {
      this.dataSourceItens = items;
      this.dxDataGridItens.instance.refresh();
    });
  }

  removePedido(pedido: PedidosModel) {
    this._pedidosService.removePedido(pedido.id).subscribe((response) => {
      this._itensForm.notify('Pedido excluído com sucesso.', 5000);
      this.fetchPedidos();
    })
  }


  onFormSubmit = (event: Event) => {
    event.preventDefault();

    if (this.dataSourceItens.length < 1) {
      this._itensForm.notify('Adicione pelo menos um item ao pedido para continuar.', 5000);
    } else {
      this.toJson();
    }
  }

  toJson() {
    const cliente_id = this.formDataPedido.cliente_id;
    const pedido: any = {
      pedido_id: this.formDataPedido.id,
      cliente_id: cliente_id,
      items: this.dataSourceItens
    }

    if (this.operation === 'post') {
      this.storePedido(pedido);
    } else {
      this.updatePedido(pedido);
    }
  }

  storePedido(pedido: PedidosModel) {
    this._pedidosService.storePedido(pedido).subscribe(res => {
      console.log(res);
      this._itensForm.notify('Pedido criado com sucesso.', 5000);
      this.fetchPedidos();
      this.clearPopupPedido();
    });
  }

  updatePedido(pedido: PedidosModel) {
    this._pedidosService.updatePedido(pedido).subscribe(res => {
      console.log(res);
      this._itensForm.notify('Pedido alterado com sucesso.', 5000);
      this.fetchPedidos();
      this.clearPopupPedido();
    });
  }

  fetchPedidos() {
    this._pedidosService.fetchPedidos().subscribe((response: PedidosModel[]) => {
      this.dataSource = response;
    });
  }

  clearPopupPedido() {
    this.popupVisible = false;
    this.dataSourceItens = [];
    this.formDataPedido = new PedidosModel();
  }

  selectedChanged = (event: any) => {
    this.selectedRow = true;
    const pedido: PedidosModel = event.data;
    this.formDataPedido = pedido;
  }

  onSelectionChanged(event: any) {
    const pedido: PedidosModel = event[0].data;

    // Adiciona sugestão de preço.
    if (pedido.produto_id) {
      const produto: ProdutosModel = this.produtos.filter(p => p.id === pedido.produto_id)[0]
      Object.assign(pedido, { preco_unitario: produto.preco_unitario });
      this.dxDataGridItens.instance.refresh();
    }

  }

  insPedido$() {
    this.titlePopup = "Adicionar pedido";
    this.operation = 'post';
    this.formDataPedido = new PedidosModel();
    this.popupVisible = true;
  }

  updatePedido$() {
    this.titlePopup = "Alterar pedido";
    this.operation = 'patch';
    this.popupVisible = true;
    this.fetchItemsPedido(this.formDataPedido);
  }

  deletePedido$() {
    let result = confirm("<i>Você tem certeza que deseja remover este pedido?</i>", "Atenção");
    result.then((dialogResult) => {
      if (dialogResult) this.removePedido(this.formDataPedido)
    });
  }

}
