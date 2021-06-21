import { AsignacionContenidoEntity } from "src/asignacion-contenido/asignacion-contenido.entity";
export declare class AsignacionEntity {
    id: string;
    iniciotiempo: number;
    fintiempo: number;
    nombredispositivo: string;
    asignacioncontenido: AsignacionContenidoEntity[];
}
