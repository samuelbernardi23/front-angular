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
  styleUrls: ['./pedidos.component.scss']
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
  produtoSelecionado!: ProdutosModel;
  isRentabilidadeRuim: boolean = false;
  loadingIndicator: boolean = true;

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

  storePedido(pedido: PedidosModel) {
    this._pedidosService.storePedido(pedido).subscribe(() => {
      this._itensForm.notify('Pedido criado com sucesso.', 5000);
      this.fetchPedidos();
      this.clearPopupPedido();
    });
  }

  updatePedido(pedido: PedidosModel) {
    this._pedidosService.updatePedido(pedido).subscribe(() => {
      this._itensForm.notify('Pedido alterado com sucesso.', 5000);
      this.fetchPedidos();
      this.clearPopupPedido();
    });
  }

  fetchPedidos() {
    this._pedidosService.fetchPedidos().subscribe((response: PedidosModel[]) => {
      this.dataSource = response;
      this.loadingIndicator = false;
    }, (error) => {
      if (error.status == 0) {
        this._itensForm.notify('Sem resposta do servidor', 5000)
      }
      this.loadingIndicator = false;
    }, () => {
      this.loadingIndicator = false;
    });
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

  onFormSubmit = (event: Event) => {
    event.preventDefault();
    if (this.dataSourceItens.length < 1) {
      this._itensForm.notify('Adicione pelo menos um item ao pedido para continuar.', 5000);
    } else {
      this.toJson();
    }
  }

  clearPopupPedido() {
    this.dxDataGridItens.instance.cancelEditData();
    this.dataSourceItens = [];
    this.formDataPedido = new PedidosModel();
    this.popupVisible = false;
  }

  selectedChanged = (event: any) => {
    this.selectedRow = true;
    const pedido: PedidosModel = event.data;
    this.formDataPedido = pedido;
  }

  selectedProduto(event: any) {
    if (event && event[0]) {
      const pedido: Pick<PedidosModel, 'produto_id' | 'preco_unitario'> = event[0].data;

      // Adiciona sugestão de preço.
      if (pedido.produto_id) {
        const produto: ProdutosModel = this.produtos.filter(p => p.id === pedido.produto_id)[0]
        this.produtoSelecionado = produto;

        if (produto) {
          Object.assign(pedido, { multiplo: produto.multiplo });
          Object.assign(pedido, {
            preco_unitario:
              pedido.preco_unitario
                ? pedido.preco_unitario
                : produto.preco_unitario
          });
          this.dxDataGridItens.instance.refresh();
        }
      }
    }
  }

  insPedidoAction() {
    this.titlePopup = "Adicionar pedido";
    this.operation = 'post';

    this.clearPopupPedido();

    this.popupVisible = true;
  }

  updatePedidoAction() {
    this.titlePopup = "Alterar pedido";
    this.operation = 'patch';

    this.dxDataGridItens.instance.cancelEditData();
    this.fetchItemsPedido(this.formDataPedido);

    this.popupVisible = true;
  }

  deletePedidoAction() {
    let result = confirm("<i>Você tem certeza que deseja remover este pedido?</i>", "Atenção");
    result.then((dialogResult) => {
      if (dialogResult) this.removePedido(this.formDataPedido)
    });
  }

  isMultiple(event: any) {
    const item: ItemsPedidoModel = event.data;

    return new Promise((resolve) => {
      if (item.multiplo)
        return resolve(item.quantidade % item.multiplo === 0);
      return resolve(true);
    });
  }

  rentabilidade(value: any): any {
    const produto = this.produtoSelecionado;
    this.isRentabilidadeRuim = false;

    if (produto) {
      const preco_unitario = parseInt(produto.preco_unitario + '');

      if (value > preco_unitario) {
        return {
          text: 'ótima',
          color: '#00ff62'
        };
      }
      if (value >= (preco_unitario / 100) * 90) {
        return {
          text: 'boa',
          color: '#ffb300'
        };
      } else {
        this.isRentabilidadeRuim = true;
        return {
          text: 'ruim',
          color: '#ff1e00'
        };
      }
    }
  }

  setTemplateRentabilidade = (e: any) => {
    const value = e.event.currentTarget.value;

    const row = document.querySelectorAll('#preco_unitario')[1].parentElement;
    const p = document.createElement('p');
    p.setAttribute
    if (value) {
      const { text, color } = this.rentabilidade(value);
      p.innerText = 'Rentabilidade ' + text;
      p.style.fontWeight = '700';
      p.style.color = color;
      p.style.position = 'fixed';
      p.style.marginTop = '-82px';
      p.style.marginLeft = '37px';
      p.id = 'update_preco_unitario';
    }

    let template = document.querySelector('#update_preco_unitario')!;
    if (template) {
      row?.removeChild(template);
    }

    row?.append(p);
    p.click()
  }

  editorOptionsPreco: any = {
    elementAttr: {
      id: 'preco_unitario'
    },
    onInput: this.setTemplateRentabilidade,
    itemTemplate: 'precoTemplate',
  }

  rentabilidadeRule = (event: any) => {
    return new Promise((resolve) => {

      return resolve(!this.isRentabilidadeRuim);
    });
  }

}
