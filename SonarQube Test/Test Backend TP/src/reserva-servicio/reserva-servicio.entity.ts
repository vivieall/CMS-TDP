import { IsNumber, IsOptional, IsString } from "class-validator";
import { HabitacionEntity } from "../habitacion/habitacion.entity";
import { HuespedEntity } from "../huesped/huesped.entity";
import { ServicioEntity } from "../servicio/servicio.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'reserva_servicio'})
export class ReservaServicioEntity {
    @IsOptional()
    @PrimaryColumn({name:`idreservaservicio`})
    id: string;
    @Column({type:"timestamp"})
    tiempo_inicio: number;
    @Column({type:"timestamp"})
    tiempo_fin: number;
    @IsString()
    @Column()
    descripcion: string;
    @IsNumber()
    @Column()
    cantidadpersona: number;
    @ManyToOne(type => HuespedEntity , reserva => reserva.reservaServicio, {onDelete: 'CASCADE', eager:true})
    @JoinTable()
    huesped : HuespedEntity;
    @ManyToOne(type => ServicioEntity , reserva => reserva.reservaServicio, {onDelete: 'CASCADE'})
    servicio : ServicioEntity;
    @ManyToOne(type => HabitacionEntity , reserva => reserva.reservaServicio, {onDelete: 'CASCADE'})
    habitacion : HabitacionEntity;
}