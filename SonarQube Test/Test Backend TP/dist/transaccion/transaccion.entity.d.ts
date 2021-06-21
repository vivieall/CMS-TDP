import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
import { TipoTransaccionEntity } from "../tipo-transaccion/tipo-transaccion.entity";
import { VentaEntity } from "src/venta/venta.entity";
export declare class TransaccionEntity {
    id: string;
    nombre: string;
    descripcion: string;
    itemTransaccion: ItemTransaccionEntity[];
    venta: VentaEntity[];
    tipotransaccion: TipoTransaccionEntity;
}
