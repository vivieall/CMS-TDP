import { IsOptional, IsString } from "class-validator";
import { ReservaServicioEntity } from "../reserva-servicio/reserva-servicio.entity";
import { CheckinEntity } from "../checkin/checkin.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'huesped'})
export class HuespedEntity {
    @IsOptional()
    @PrimaryColumn({name:`idhuesped`})
    id: string;
    @IsString()
    @Column()
    nombre: string;
    @IsString()
    @Column()
    apellido: string;
    @IsString()
    @Column()
    tipodocumento: string;
    @IsString()
    @Column()
    email: string;
    @IsString()
    @Column()
    numero_telefono: string;
    @IsString()
    @Column()
    ciudad: string;
    @IsString()
    @Column()
    pais: string;
    @OneToMany(type => ReservaServicioEntity , reserva => reserva.huesped, {onDelete: 'CASCADE'})
    reservaServicio : ReservaServicioEntity[];
    @OneToMany(type => CheckinEntity , reserva => reserva.huesped, {onDelete: 'CASCADE'})
    checkin : CheckinEntity[];
}