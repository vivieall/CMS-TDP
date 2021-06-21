import { TipoConfiguracionEntity } from "src/tipo-configuracion/tipo-configuracion.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'configuracion'})
export class ConfiguracionEntity {
    @PrimaryColumn({name:`idconfiguracion`})
    id: string;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @ManyToOne(()=>TipoConfiguracionEntity, tipoconfiguracion => tipoconfiguracion.configuracion)
    tipoconfiguracion:TipoConfiguracionEntity;
}