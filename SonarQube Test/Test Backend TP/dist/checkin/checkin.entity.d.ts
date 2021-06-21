import { HabitacionEntity } from "../habitacion/habitacion.entity";
import { HuespedEntity } from "../huesped/huesped.entity";
import { VentaEntity } from "../venta/venta.entity";
export declare class CheckinEntity {
    id: string;
    huesped: HuespedEntity;
    venta: VentaEntity[];
    habitacion: HabitacionEntity;
    antiguaHabitacion: string;
    tiempo_inicio: number;
    tiempo_fin: number;
}
