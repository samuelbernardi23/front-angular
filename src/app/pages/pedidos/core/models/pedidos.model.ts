import { ItemsPedidoModel } from "./items-pedido.model";

export class PedidosModel {
   id!: number;
   pedido_id!: number;
   cliente_id!:number;
   produto_id!: number;
   quantidade!: number;
   preco_unitario!: number;
   valor_total!: number;
   items!: ItemsPedidoModel[]
}