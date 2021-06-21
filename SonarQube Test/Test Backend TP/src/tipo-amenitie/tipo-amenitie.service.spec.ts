import { Test, TestingModule } from '@nestjs/testing';
import { TipoAmenitieService } from './tipo-amenitie.service';

describe('TipoAmenitieService', () => {
  let service: TipoAmenitieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAmenitieService],
    }).compile();

    service = module.get<TipoAmenitieService>(TipoAmenitieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
