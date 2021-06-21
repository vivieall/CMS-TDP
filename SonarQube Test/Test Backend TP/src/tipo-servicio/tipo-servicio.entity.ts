import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ServicioEntity } from "../servicio/servicio.entity";

@Entity({name:'tipo_servicio'})
export class TipoServicioEntity {
    @PrimaryColumn({name:`idtiposervicio`})
    id:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @OneToMany(() => ServicioEntity, servicio => servicio.tiposervicio, {onDelete: 'CASCADE'})
    servicios:ServicioEntity[];
}