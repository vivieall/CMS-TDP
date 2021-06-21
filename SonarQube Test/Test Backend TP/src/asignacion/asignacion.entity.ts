import { AsignacionContenidoEntity } from "src/asignacion-contenido/asignacion-contenido.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'asignacion'})
export class AsignacionEntity{
    @PrimaryColumn({name: `idasignacion`})
    id: string;
    @Column({type:"time",nullable:true})
    iniciotiempo: number;
    @Column({type:"time",nullable:true})
    fintiempo: number;
    @Column()
    nombredispositivo: string;
    @OneToMany(() => AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.asignacion)
    asignacioncontenido:AsignacionContenidoEntity[];
}