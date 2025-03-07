import { Test, TestingModule } from '@nestjs/testing';
import { DinosaurController } from './dinosaur.controller';
import { DinosaurService } from './dinosaur.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('DinosaurController', () => {
  let dinosaurController: DinosaurController;
  let dinosaurService: DinosaurService;

  const mockDinosaurService = {
    spawnDinosaur: jest.fn(),
    spawnSaddle: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      // Provide default values for config keys if needed
      if (key === 'YOUR_CONFIG_KEY') {
        return 'your_default_value';
      }
      return undefined; // Or throw an error if the key is required
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinosaurController],
      providers: [
        {
          provide: DinosaurService,
          useValue: mockDinosaurService,
        },
        {
          provide: ConfigService, // Provide the mock ConfigService
          useValue: mockConfigService,
        },
      ],
    }).compile();

    dinosaurController = module.get<DinosaurController>(DinosaurController);
    dinosaurService = module.get<DinosaurService>(DinosaurService);
  });

  it('should be defined', () => {
    expect(dinosaurController).toBeDefined();
  });

  describe('spawnDino', () => {
    it('should call dinosaurService.spawnDinosaur with correct arguments', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/Dinos/Raptor/Raptor_Character_BP.Raptor_Character_BP'";
      const mockResponse = [{ result: 'ok' }];
      mockDinosaurService.spawnDinosaur.mockResolvedValue(mockResponse);

      const result = await dinosaurController.spawnDino(map, eosId, blueprint);

      expect(dinosaurService.spawnDinosaur).toHaveBeenCalledWith(
        map,
        eosId,
        blueprint,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('spawnSaddle', () => {
    it('should call dinosaurService.spawnSaddle with correct arguments', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Items/Armor/Saddles/PrimalItemArmor_RaptorSaddle.PrimalItemArmor_RaptorSaddle'";
      const isBlueprint = true;
      const mockResponse = [{ result: 'ok' }];
      mockDinosaurService.spawnSaddle.mockResolvedValue(mockResponse);

      const result = await dinosaurController.spawnSaddle(
        map,
        eosId,
        blueprint,
        isBlueprint,
      );

      expect(dinosaurService.spawnSaddle).toHaveBeenCalledWith(
        map,
        eosId,
        blueprint,
        isBlueprint,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
