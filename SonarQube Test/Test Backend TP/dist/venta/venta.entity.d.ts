import { CheckinEntity } from "../checkin/checkin.entity";
import { DetalleTransaccionEntity } from "../detalle-transaccion/detalle-transaccion.entity";
import { TransaccionEntity } from "src/transaccion/transaccion.entity";
export declare class VentaEntity {
    id: string;
    checkin: CheckinEntity;
    transaccion: TransaccionEntity;
    detalleTransaccion: DetalleTransaccionEntity[];
    monto: number;
    moneda: string;
    descripcion: string;
    fecha: number;
}
