import { ServicioEntity } from "../servicio/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'detalle_servicio'})
export class DetalleServicioEntity{
    @PrimaryColumn({name:`iddetalleservicio`})
    id:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @ManyToOne(() => ServicioEntity, servicio => servicio.detalleservicio, {onDelete: 'CASCADE'})
    servicio:ServicioEntity;
}