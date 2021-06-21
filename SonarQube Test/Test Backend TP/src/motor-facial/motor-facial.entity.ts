import { ItemFacialEntity } from "src/item-facial/item-facial.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'motor_facial_fotos'})
export class MotorFacialEntity {
    @PrimaryColumn({name:`idoferta`})
    id: string;
    @Column()
    titulo: string;
    @Column()
    descripcion: string;
    @Column({nullable:true})
    url_imagen: string;
    @Column({nullable:true})
    s3Key: string;
    @ManyToOne(()=> ItemFacialEntity, itemfacial=> itemfacial.motorfacial, {onDelete: 'CASCADE'})
    itemfacial:ItemFacialEntity;

}