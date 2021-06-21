import { IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name:'administrador'})
export class AdministradorEntity {
    @IsOptional()
    @PrimaryColumn({name:`idadministrador`})
    id: string;
    @IsString()
    @Column()
    email: string;
    @IsString()
    @Column({name:`contrasena`})
    password: string;
  }