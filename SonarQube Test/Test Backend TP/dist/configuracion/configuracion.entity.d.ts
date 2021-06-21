import { TipoConfiguracionEntity } from "src/tipo-configuracion/tipo-configuracion.entity";
export declare class ConfiguracionEntity {
    id: string;
    nombre: string;
    descripcion: string;
    tipoconfiguracion: TipoConfiguracionEntity;
}
