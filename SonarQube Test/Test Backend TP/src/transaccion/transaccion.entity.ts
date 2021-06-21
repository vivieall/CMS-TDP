import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
import { TipoTransaccionEntity } from "../tipo-transaccion/tipo-transaccion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { VentaEntity } from "src/venta/venta.entity";

@Entity({name:'transaccion'})
export class TransaccionEntity {
    @PrimaryColumn({name:`idtransaccion`})
    id:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @OneToMany(() => ItemTransaccionEntity, itemTransaccion => itemTransaccion.transaccion, {onDelete: 'CASCADE'})
    itemTransaccion:ItemTransaccionEntity[];
    @OneToMany(() => VentaEntity, venta => venta.transaccion, {onDelete: 'CASCADE'})
    venta:VentaEntity[];
    @ManyToOne(() => TipoTransaccionEntity, tipotransaccion => tipotransaccion.transaccion, {onDelete: 'CASCADE'})
    tipotransaccion:TipoTransaccionEntity;
}