import { CheckinEntity } from "../checkin/checkin.entity";
import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
export declare class HabitacionEntity {
    id: string;
    checkin: CheckinEntity;
    reservaServicio: ReservaServicioEntity[];
    numerohabitacion: number;
    descripcion: string;
    activo: boolean;
}
