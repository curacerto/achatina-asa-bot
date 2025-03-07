import { Test, TestingModule } from '@nestjs/testing';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('ResourceController', () => {
  let resourceController: ResourceController;
  let resourceService: ResourceService;

  const mockResourceService = {
    spawnItem: jest.fn(),
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
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: mockResourceService,
        },
        {
          provide: ConfigService, // Provide the mock ConfigService
          useValue: mockConfigService,
        },
      ],
    }).compile();

    resourceController = module.get<ResourceController>(ResourceController);
    resourceService = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('spawnResource', () => {
    it('should call resourceService.spawnItem with correct arguments', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Resources/PrimalItemResource_Metal.PrimalItemResource_Metal'";
      const quantity = 10;
      const mockResponse = [{ result: 'ok' }];
      mockResourceService.spawnItem.mockResolvedValue(mockResponse);

      const result = await resourceController.spawnResource(
        map,
        eosId,
        blueprint,
        quantity,
      );

      expect(resourceService.spawnItem).toHaveBeenCalledWith(
        map,
        eosId,
        blueprint,
        quantity,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
