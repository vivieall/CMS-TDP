import { AnuncioEntity } from "../anuncio/anuncio.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'tipo_anuncio'})
export class TipoAnuncioEntity {
    @PrimaryColumn({name:`idtipoanuncio`})
    id: string;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @OneToMany(() => AnuncioEntity, anuncio => anuncio.tipoanuncio)
    anuncio: AnuncioEntity[];
}