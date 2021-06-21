import { IsOptional, IsString } from "class-validator";
import { AmenitieEntity } from "../amenitie/amenitie.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'tipo_amenitie'})
export class TipoAmenitieEntity {
    @IsOptional()
    @PrimaryColumn({name:`idtipoamenitie`})
    id: string;
    @IsString()
    @Column()
    nombre: string;
    @OneToMany(type => AmenitieEntity , userChat => userChat.tipoAmenitie)
    amenity : AmenitieEntity[];
  }