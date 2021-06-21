import { Test, TestingModule } from '@nestjs/testing';
import { ItemTransaccionController } from './item-transaccion.controller';

describe('ItemTransaccionController', () => {
  let controller: ItemTransaccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTransaccionController],
    }).compile();

    controller = module.get<ItemTransaccionController>(ItemTransaccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
