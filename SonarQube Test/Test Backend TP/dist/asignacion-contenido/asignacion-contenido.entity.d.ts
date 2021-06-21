import { AsignacionEntity } from "src/asignacion/asignacion.entity";
import { ContenidoEntity } from "src/contenido/contenido.entity";
import { DispositivoEntity } from "src/dispositivo/dispositivo.entity";
import { GrupoContenidoEntity } from "src/grupo-contenido/grupo-contenido.entity";
export declare class AsignacionContenidoEntity {
    id: string;
    contenido: ContenidoEntity;
    grupocontenido: GrupoContenidoEntity;
    asignacion: AsignacionEntity;
    dispositivo: DispositivoEntity[];
}
