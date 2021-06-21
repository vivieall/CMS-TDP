import { Test, TestingModule } from '@nestjs/testing';
import { DetalleTransaccionService } from './detalle-transaccion.service';

describe('DetalleTransaccionService', () => {
  let service: DetalleTransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleTransaccionService],
    }).compile();

    service = module.get<DetalleTransaccionService>(DetalleTransaccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
