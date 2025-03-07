import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { ResourceRepository } from './resource.repository';

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let resourceRepository: ResourceRepository;

  const mockResourceRepository = {
    spawnItem: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: ResourceRepository,
          useValue: mockResourceRepository,
        },
      ],
    }).compile();

    resourceService = module.get<ResourceService>(ResourceService);
    resourceRepository = module.get<ResourceRepository>(ResourceRepository);
  });

  it('should be defined', () => {
    expect(resourceService).toBeDefined();
  });

  describe('spawnItem', () => {
    it('should call resourceRepository.spawnItem with correct arguments and return mapped response', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Resources/PrimalItemResource_Metal.PrimalItemResource_Metal'";
      const quantity = 10;

      const mockSpawnItemResponse = ['Spawnitem command successful.'];
      mockResourceRepository.spawnItem.mockResolvedValue(mockSpawnItemResponse);

      const result = await resourceService.spawnItem(
        map,
        eosId,
        blueprint,
        quantity,
      );

      expect(resourceRepository.spawnItem).toHaveBeenCalledTimes(1);
      expect(resourceRepository.spawnItem).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([{ result: 'ok' }]);
    });

    it('should handle blueprint names not starting with Blueprint', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        '/Game/PrimalEarth/CoreBlueprints/Resources/PrimalItemResource_Metal.PrimalItemResource_Metal';
      const quantity = 10;

      const mockSpawnItemResponse = ['Spawnitem command successful.'];
      mockResourceRepository.spawnItem.mockResolvedValue(mockSpawnItemResponse);

      await resourceService.spawnItem(map, eosId, blueprint, quantity);

      expect(resourceRepository.spawnItem).toHaveBeenCalledTimes(1);
    });

    it('should return error result when spawn command fails', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Resources/PrimalItemResource_Metal.PrimalItemResource_Metal'";
      const quantity = 10;

      const mockSpawnItemResponse = ['Spawnitem command failed.'];
      mockResourceRepository.spawnItem.mockResolvedValue(mockSpawnItemResponse);

      const result = await resourceService.spawnItem(
        map,
        eosId,
        blueprint,
        quantity,
      );

      expect(result).toEqual([{ result: 'error' }]);
    });
  });
});
