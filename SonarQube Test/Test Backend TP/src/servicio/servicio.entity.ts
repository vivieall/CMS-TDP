import { DetalleServicioEntity } from "../detalle-servicio/detalle-servicio.entity";
import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import {TipoServicioEntity} from "../tipo-servicio/tipo-servicio.entity"

@Entity({name:'servicio'})
export class ServicioEntity{
    @PrimaryColumn({name:`idservicio`})
    id:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @ManyToOne(() => TipoServicioEntity, tiposervicio => tiposervicio.servicios, {onDelete: 'CASCADE'})
    tiposervicio:TipoServicioEntity;
    @OneToMany(() => DetalleServicioEntity, detalleservicio => detalleservicio.servicio)
    detalleservicio: DetalleServicioEntity[];
    @OneToMany(() => ReservaServicioEntity, detalleservicio => detalleservicio.servicio)
    reservaServicio: ReservaServicioEntity[];
}