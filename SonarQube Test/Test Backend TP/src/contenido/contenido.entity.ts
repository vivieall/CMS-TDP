import { AsignacionContenidoEntity } from "../asignacion-contenido/asignacion-contenido.entity";
import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name:'contenido'})
export class ContenidoEntity {
    @PrimaryColumn({name:'idcontenido'})
    id: string;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column({nullable:true})
    url_imagen: string;
    @Column({nullable:true})
    s3Key: string;
    @OneToMany(()=>AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.contenido)
    asignacioncontenido:AsignacionContenidoEntity[];
    @OneToOne(()=>ItemTransaccionEntity, itemTransaccion => itemTransaccion.contenido)
    @JoinColumn()
    itemTransaccion:ItemTransaccionEntity;
}
 