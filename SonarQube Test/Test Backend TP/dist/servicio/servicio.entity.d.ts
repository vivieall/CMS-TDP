import { DetalleServicioEntity } from "../detalle-servicio/detalle-servicio.entity";
import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
import { TipoServicioEntity } from "../tipo-servicio/tipo-servicio.entity";
export declare class ServicioEntity {
    id: string;
    nombre: string;
    descripcion: string;
    tiposervicio: TipoServicioEntity;
    detalleservicio: DetalleServicioEntity[];
    reservaServicio: ReservaServicioEntity[];
}
