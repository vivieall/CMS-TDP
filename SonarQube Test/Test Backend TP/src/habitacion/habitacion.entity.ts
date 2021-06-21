import { CheckinEntity } from "../checkin/checkin.entity";
import { HuespedEntity } from "../huesped/huesped.entity";
import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'habitacion'})
export class HabitacionEntity{
    @PrimaryColumn({name:`idhabtiacion`})
    id: string;
    @ManyToOne(()=>CheckinEntity, checkin => checkin.habitacion, {onDelete: 'CASCADE'})
    checkin: CheckinEntity;
    @OneToMany(()=>ReservaServicioEntity, reservaServicio => reservaServicio.habitacion, {onDelete: 'CASCADE'})
    reservaServicio: ReservaServicioEntity[];
    @Column()
    numerohabitacion:number
    @Column()
    descripcion:string
    @Column()
    activo:boolean
}