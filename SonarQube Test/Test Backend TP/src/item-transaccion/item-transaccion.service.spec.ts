import { Test, TestingModule } from '@nestjs/testing';
import { ItemTransaccionService } from './item-transaccion.service';

describe('ItemTransaccionService', () => {
  let service: ItemTransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemTransaccionService],
    }).compile();

    service = module.get<ItemTransaccionService>(ItemTransaccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
