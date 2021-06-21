import { AsignacionContenidoEntity } from "src/asignacion-contenido/asignacion-contenido.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'dispositivo'})
export class DispositivoEntity{
    @PrimaryColumn({name:'iddispositivo'})
    id: string;
    @Column()
    nombre: string
    @Column()
    descripcion: string
    @ManyToOne(() => AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.dispositivo,{onDelete:'CASCADE'})
    asignacioncontenido: AsignacionContenidoEntity;
}