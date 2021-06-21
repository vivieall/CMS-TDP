import { ConfiguracionEntity } from "src/configuracion/configuracion.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'tipo_configuracion'})
export class TipoConfiguracionEntity {
    @PrimaryColumn({name:`idtipoconfiguracion`})
    id: string;
    @Column()
    nombre: string;
    @OneToMany(()=>ConfiguracionEntity, configuracion => configuracion.tipoconfiguracion)
    configuracion:ConfiguracionEntity[];
}