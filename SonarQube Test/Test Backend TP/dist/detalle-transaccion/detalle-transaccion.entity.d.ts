import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
import { VentaEntity } from "../venta/venta.entity";
export declare class DetalleTransaccionEntity {
    id: string;
    venta: VentaEntity;
    itemTransaccion: ItemTransaccionEntity;
    precio: string;
    cantidad: number;
}
