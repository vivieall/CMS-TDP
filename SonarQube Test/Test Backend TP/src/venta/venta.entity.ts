import { CheckinEntity } from "../checkin/checkin.entity";
import { DetalleServicioEntity } from "../detalle-servicio/detalle-servicio.entity";
import { DetalleTransaccionEntity } from "../detalle-transaccion/detalle-transaccion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TransaccionEntity } from "src/transaccion/transaccion.entity";

@Entity({name:'venta'})
export class VentaEntity{
    @PrimaryColumn({name:`idventa`})
    id: string;
    @ManyToOne(()=>CheckinEntity, checkin => checkin.venta, {onDelete: 'CASCADE'})
    checkin: CheckinEntity;
    @ManyToOne(()=>TransaccionEntity, transaccion => transaccion.venta, {onDelete: 'CASCADE'})
    transaccion: TransaccionEntity;
    @OneToMany(()=>DetalleTransaccionEntity, detalleTransaccion => detalleTransaccion.venta, {onDelete: 'CASCADE'})
    detalleTransaccion: DetalleTransaccionEntity[];
    @Column({type:'float'})
    monto:number
    @Column()
    moneda:string
    @Column()
    descripcion:string
    @Column({type:'timestamp'})
    fecha:number
}