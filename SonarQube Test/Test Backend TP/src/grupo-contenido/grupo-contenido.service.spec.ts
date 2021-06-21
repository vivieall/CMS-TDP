import { Test, TestingModule } from '@nestjs/testing';
import { GrupoContenidoService } from './grupo-contenido.service';

describe('GrupoContenidoService', () => {
  let service: GrupoContenidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoContenidoService],
    }).compile();

    service = module.get<GrupoContenidoService>(GrupoContenidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
