import { HabitacionEntity } from "../habitacion/habitacion.entity";
import { HuespedEntity } from "../huesped/huesped.entity";
import { ServicioEntity } from "../servicio/servicio.entity";
export declare class ReservaServicioEntity {
    id: string;
    tiempo_inicio: number;
    tiempo_fin: number;
    descripcion: string;
    cantidadpersona: number;
    huesped: HuespedEntity;
    servicio: ServicioEntity;
    habitacion: HabitacionEntity;
}
