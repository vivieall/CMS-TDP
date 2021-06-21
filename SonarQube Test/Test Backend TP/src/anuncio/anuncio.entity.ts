import { TipoAnuncioEntity } from "../tipo-anuncio/tipo-anuncio.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'anuncio'})
export class AnuncioEntity{
    @PrimaryColumn({name:`idanuncio`})
    id: string;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @ManyToOne(()=>TipoAnuncioEntity, tipoanuncio => tipoanuncio.anuncio, {onDelete: 'CASCADE'})
    tipoanuncio: TipoAnuncioEntity;
}