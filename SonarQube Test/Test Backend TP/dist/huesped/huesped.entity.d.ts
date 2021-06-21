import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
import { CheckinEntity } from "../checkin/checkin.entity";
export declare class HuespedEntity {
    id: string;
    nombre: string;
    apellido: string;
    tipodocumento: string;
    email: string;
    numero_telefono: string;
    ciudad: string;
    pais: string;
    reservaServicio: ReservaServicioEntity[];
    checkin: CheckinEntity[];
}
