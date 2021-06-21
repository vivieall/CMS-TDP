import { IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TipoAmenitieEntity } from "../tipo-amenitie/tipo-amenitie.entity";

@Entity({name:'amenitie'})
export class AmenitieEntity {
    @IsOptional()
    @PrimaryColumn({name:`idamenitie`})
    id: string;
    @IsString()
    @Column()
    nombre: string;
    @IsString()
    @Column()
    descripcion: string;
    @IsString()
    @Column()
    clima: string;
    climaData:Object;
    @ManyToOne(type => TipoAmenitieEntity , tipoAmenitie => tipoAmenitie.amenity, {onDelete: 'CASCADE'})
    tipoAmenitie : TipoAmenitieEntity;
  }