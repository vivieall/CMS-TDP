import { AsignacionContenidoEntity } from "../asignacion-contenido/asignacion-contenido.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'grupo_contenido'})
export class GrupoContenidoEntity {
    @PrimaryColumn({name:`idgrupo`})
    id: string;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @OneToMany(()=>AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.grupocontenido)
    asignacioncontenido:AsignacionContenidoEntity[]; 
}