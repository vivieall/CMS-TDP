import { TipoAmenitieEntity } from "../tipo-amenitie/tipo-amenitie.entity";
export declare class AmenitieEntity {
    id: string;
    nombre: string;
    descripcion: string;
    clima: string;
    climaData: Object;
    tipoAmenitie: TipoAmenitieEntity;
}
