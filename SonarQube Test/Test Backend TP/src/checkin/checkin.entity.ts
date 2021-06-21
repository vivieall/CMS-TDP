import { HabitacionEntity } from "../habitacion/habitacion.entity";
import { HuespedEntity } from "../huesped/huesped.entity";
import { VentaEntity } from "../venta/venta.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity({name:'checkin'})
export class CheckinEntity{
    @PrimaryColumn({name:`idcheckin`})
    id: string;
    @ManyToOne(()=>HuespedEntity, huesped => huesped.checkin, {onDelete: 'CASCADE'})
    huesped: HuespedEntity;
    @OneToMany(()=>VentaEntity, venta => venta.checkin, {onDelete: 'CASCADE'})
    venta: VentaEntity[];
    @ManyToOne(()=>HabitacionEntity, habitacion => habitacion.checkin, {onDelete: 'CASCADE'})
    habitacion: HabitacionEntity;
    @IsOptional()
    antiguaHabitacion:string
    @Column({type:"timestamp"})
    tiempo_inicio: number;
    @Column({type:"timestamp"})
    tiempo_fin: number;
}