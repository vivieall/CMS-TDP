import { ContenidoEntity } from "../contenido/contenido.entity";
import { DetalleTransaccionEntity } from "../detalle-transaccion/detalle-transaccion.entity";
import { TransaccionEntity } from "../transaccion/transaccion.entity";
export declare class ItemTransaccionEntity {
    id: string;
    contenido: ContenidoEntity;
    detalleTransaccion: DetalleTransaccionEntity[];
    precio: number;
    cantidad: number;
    activo: boolean;
    transaccion: TransaccionEntity;
}
