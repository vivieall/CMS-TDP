import { HuespedEntity } from "../huesped/huesped.entity";
import { ItemTransaccionEntity } from "../item-transaccion/item-transaccion.entity";
import { VentaEntity } from "../venta/venta.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'detalle_transaccion'})
export class DetalleTransaccionEntity{
    @PrimaryColumn({name:`iddetalletransaccion`})
    id: string;
    @ManyToOne(()=>VentaEntity, venta => venta.detalleTransaccion, {onDelete: 'CASCADE'})
    venta: VentaEntity;
    @ManyToOne(()=>ItemTransaccionEntity, itemTransaccion => itemTransaccion.detalleTransaccion, {onDelete: 'CASCADE'})
    itemTransaccion: ItemTransaccionEntity;
    @Column({type:'float'})
    precio:string
    @Column()
    cantidad:number
}