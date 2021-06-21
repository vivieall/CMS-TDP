import { TipoAnuncioEntity } from "../tipo-anuncio/tipo-anuncio.entity";
export declare class AnuncioEntity {
    id: string;
    nombre: string;
    descripcion: string;
    tipoanuncio: TipoAnuncioEntity;
}
