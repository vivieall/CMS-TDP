import { Test, TestingModule } from '@nestjs/testing';
import { TipoAmenitieController } from './tipo-amenitie.controller';

describe('TipoAmenitieController', () => {
  let controller: TipoAmenitieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAmenitieController],
    }).compile();

    controller = module.get<TipoAmenitieController>(TipoAmenitieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
