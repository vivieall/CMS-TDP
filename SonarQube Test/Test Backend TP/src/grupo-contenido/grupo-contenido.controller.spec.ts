import { Test, TestingModule } from '@nestjs/testing';
import { GrupoContenidoController } from './grupo-contenido.controller';

describe('GrupoContenidoController', () => {
  let controller: GrupoContenidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoContenidoController],
    }).compile();

    controller = module.get<GrupoContenidoController>(GrupoContenidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
