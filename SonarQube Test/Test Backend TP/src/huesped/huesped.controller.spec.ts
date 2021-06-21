import { Test, TestingModule } from '@nestjs/testing';
import { HuespedController } from './huesped.controller';

describe('HuespedController', () => {
  let controller: HuespedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HuespedController],
    }).compile();

    controller = module.get<HuespedController>(HuespedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
