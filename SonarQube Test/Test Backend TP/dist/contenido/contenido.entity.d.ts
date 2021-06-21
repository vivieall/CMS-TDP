import { AsignacionContenidoEntity } from "../asignacion-contenido/asignacion-contenido.entity";
import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
export declare class ContenidoEntity {
    id: string;
    nombre: string;
    descripcion: string;
    url_imagen: string;
    s3Key: string;
    asignacioncontenido: AsignacionContenidoEntity[];
    itemTransaccion: ItemTransaccionEntity;
}
