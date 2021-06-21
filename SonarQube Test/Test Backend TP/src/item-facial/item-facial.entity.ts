import { bool } from "aws-sdk/clients/signer";
import { MotorFacialEntity } from "src/motor-facial/motor-facial.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'item_facial'})
export class ItemFacialEntity {
    @PrimaryColumn({name:`iditemfacial`})
    id: string;
    @Column()
    genero: string;
    @Column()
    grupo: string;    
    @Column()
    tipo: string;
    @OneToMany(()=> MotorFacialEntity, motorfacial=> motorfacial.itemfacial)
    motorfacial:MotorFacialEntity[];
}