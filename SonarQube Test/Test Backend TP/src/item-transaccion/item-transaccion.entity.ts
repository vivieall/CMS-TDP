import { ContenidoEntity } from "../contenido/contenido.entity";
import { DetalleTransaccionEntity } from "../detalle-transaccion/detalle-transaccion.entity";
import { TransaccionEntity } from "../transaccion/transaccion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name:'item_transaccion'})
export class ItemTransaccionEntity{
    @PrimaryColumn({name:`iditemtransaccion`})
    id: string;
    @OneToOne(()=>ContenidoEntity, contenido => contenido.itemTransaccion, {onDelete:'CASCADE',eager:true})
    contenido: ContenidoEntity;
    @OneToMany(()=>DetalleTransaccionEntity, detalleTransaccion => detalleTransaccion.itemTransaccion, {onDelete: 'CASCADE'})
    detalleTransaccion: DetalleTransaccionEntity[];
    @Column({type:'float'})
    precio:number
    @Column()
    cantidad:number
    @Column()
    activo:boolean
    @ManyToOne(()=>TransaccionEntity, transaccion => transaccion.itemTransaccion, {onDelete: 'CASCADE'})
    transaccion:TransaccionEntity
}