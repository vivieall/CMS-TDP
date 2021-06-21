import { Test, TestingModule } from '@nestjs/testing';
import { DetalleTransaccionController } from './detalle-transaccion.controller';

describe('DetalleTransaccionController', () => {
  let controller: DetalleTransaccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleTransaccionController],
    }).compile();

    controller = module.get<DetalleTransaccionController>(DetalleTransaccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
