import { AsignacionEntity } from "src/asignacion/asignacion.entity";
import { ContenidoEntity } from "src/contenido/contenido.entity";
import { DispositivoEntity } from "src/dispositivo/dispositivo.entity";
import { GrupoContenidoEntity } from "src/grupo-contenido/grupo-contenido.entity";
import { Entity, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";

@Entity({name: 'asignacion_contenido'})
export class AsignacionContenidoEntity{
    @PrimaryColumn({name:`idasignacioncontenido`})
    id:string;    
    @ManyToOne(() => ContenidoEntity, contenido =>contenido.asignacioncontenido, {onDelete: 'CASCADE'})
    contenido: ContenidoEntity;
    @ManyToOne(() => GrupoContenidoEntity, grupocontenido => grupocontenido.asignacioncontenido, {onDelete: 'CASCADE'})
    grupocontenido: GrupoContenidoEntity; 
    @ManyToOne(() => AsignacionEntity, asignacion => asignacion.asignacioncontenido, {onDelete: 'CASCADE'})
    asignacion: AsignacionEntity;
    @OneToMany(() => DispositivoEntity, dispositivo => dispositivo.asignacioncontenido)
    dispositivo: DispositivoEntity[];
}