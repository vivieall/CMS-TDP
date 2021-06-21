import { Test, TestingModule } from '@nestjs/testing';
import { AmenitieController } from './amenitie.controller';

describe('AmenitieController', () => {
  let controller: AmenitieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmenitieController],
    }).compile();

    controller = module.get<AmenitieController>(AmenitieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
