import { Repository } from 'typeorm';
import { VentaEntity } from './venta.entity';
import { CheckinService } from 'src/checkin/checkin.service';
export declare class VentaService {
    private ventaRepository;
    private checkinService;
    constructor(ventaRepository: Repository<VentaEntity>, checkinService: CheckinService);
    findAll(): Promise<VentaEntity[]>;
    findOne(id: any): Promise<VentaEntity>;
    findOneWithHuesped(id: any): Promise<VentaEntity>;
    findOneByTransaccion(id: any): Promise<VentaEntity[]>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
