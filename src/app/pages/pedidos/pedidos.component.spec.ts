
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PedidosComponent } from './pedidos.component';
import { PedidosModule } from './pedidos.module';
import { ProdutosModel } from '../produtos/core/models/produtos.model';

describe('PedidosComponent', () => {
   let component: PedidosComponent;
   let fixture: ComponentFixture<PedidosComponent>;

   beforeEach(waitForAsync((() => {
      TestBed.configureTestingModule({
         imports: [PedidosModule],
         declarations: [PedidosComponent],
      });

      fixture = TestBed.createComponent(PedidosComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   })));

   it('deve criar o component', () => {
      expect(component).toBeTruthy();
   });

   it('deve retornar VERDADEIRO se a quantidade informada FOR múltipla do produto informado', waitForAsync(() => {
      const QUANTIDADE = 2
      const produto = {
         multiplo: 2,
         preco_unitario: "60000.00",
         produto_id: 2,
         quantidade: QUANTIDADE
      }
      component.isMultiple({ data: produto }).then(res => {
         expect(res).toBeTruthy();
      })
   }));

   it('deve retornar FALSO se a quantidade informada NÃO FOR múltipla do produto informado', waitForAsync(() => {
      const QUANTIDADE = 2
      const produto = {
         multiplo: 3,
         preco_unitario: "60000.00",
         produto_id: 2,
         quantidade: QUANTIDADE
      }
      component.isMultiple({ data: produto }).then(res => {
         expect(res).toBeFalsy();
      })
   }));

   it('deve retornar a sugestão de preço do produto selecionado', (() => {
      const produto: ProdutosModel[] = [{
         id: 1,
         nome: 'Teste',
         multiplo: 3,
         preco_unitario: 60000,
      }]
      const pedido: any = {
         produto_id: 1
      }

      component.produtos = produto;
      component.selectedProduto([{ data: pedido }]);
      expect(pedido.preco_unitario).toBeTruthy();
   }));

   it('deve informar o múltiplo do produto selecionado', (() => {
      const produto: ProdutosModel[] = [{
         id: 1,
         nome: 'Produto de teste',
         multiplo: 3,
         preco_unitario: 60000,
      }]

      const pedido: any = {
         produto_id: 1
      }

      component.produtos = produto;
      component.selectedProduto([{ data: pedido }]);
      expect(pedido.multiplo).toBeTruthy();
   }));

});