import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TransaccionEntity } from "../transaccion/transaccion.entity";

@Entity({name:'tipo_transaccion'})
export class TipoTransaccionEntity {
    @PrimaryColumn({name:`idtipotransaccion`})
    id:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @OneToMany(() => TransaccionEntity, transaccion => transaccion.tipotransaccion, {onDelete: 'CASCADE'})
    transaccion:TransaccionEntity[];
}