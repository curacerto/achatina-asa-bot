import { Test, TestingModule } from '@nestjs/testing';
import { DinosaurService } from './dinosaur.service';
import { DinosaurRepository } from './dinosaur.repository';

describe('DinosaurService', () => {
  let dinosaurService: DinosaurService;
  let dinosaurRepository: DinosaurRepository;

  const mockDinosaurRepository = {
    spawnCommand: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DinosaurService,
        {
          provide: DinosaurRepository,
          useValue: mockDinosaurRepository,
        },
      ],
    }).compile();

    dinosaurService = module.get<DinosaurService>(DinosaurService);
    dinosaurRepository = module.get<DinosaurRepository>(DinosaurRepository);
  });

  it('should be defined', () => {
    expect(dinosaurService).toBeDefined();
  });

  describe('spawnDinosaur', () => {
    it('should call dinosaurRepository.spawnCommand with correct arguments and return mapped response', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/Dinos/Raptor/Raptor_Character_BP.Raptor_Character_BP'";

      const mockSpawnCommandResponse = ['Spawn dinosaur command successful.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await dinosaurService.spawnDinosaur(map, eosId, blueprint);

      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledTimes(1);
      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([{ result: 'ok' }]);
    });

    it('should handle blueprint names not starting with Blueprint', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        '/Game/PrimalEarth/Dinos/Raptor/Raptor_Character_BP.Raptor_Character_BP';

      const mockSpawnCommandResponse = ['Spawn dinosaur command successful.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      await dinosaurService.spawnDinosaur(map, eosId, blueprint);

      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledTimes(1);
    });

    it('should return error result when spawn command fails', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/Dinos/Raptor/Raptor_Character_BP.Raptor_Character_BP'";

      const mockSpawnCommandResponse = ['Spawn dinosaur command failed.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await dinosaurService.spawnDinosaur(map, eosId, blueprint);

      expect(result).toEqual([{ result: 'error' }]);
    });
  });

  describe('spawnSaddle', () => {
    it('should call dinosaurRepository.spawnCommand with correct arguments and return mapped response', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Items/Armor/Saddles/PrimalItemArmor_RaptorSaddle.PrimalItemArmor_RaptorSaddle'";
      const isBlueprint = true;

      const mockSpawnCommandResponse = ['Spawn dinosaur command successful.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await dinosaurService.spawnSaddle(
        map,
        eosId,
        blueprint,
        isBlueprint,
      );

      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledTimes(1);
      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([{ result: 'ok' }]);
    });

    it('should handle blueprint names not starting with Blueprint in spawnSaddle', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Saddles/PrimalItemArmor_RaptorSaddle.PrimalItemArmor_RaptorSaddle';
      const isBlueprint = true;

      const mockSpawnCommandResponse = ['Spawn dinosaur command successful.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      await dinosaurService.spawnSaddle(map, eosId, blueprint, isBlueprint);

      expect(dinosaurRepository.spawnCommand).toHaveBeenCalledTimes(1);
    });

    it('should return error result when spawn command fails in spawnSaddle', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Items/Armor/Saddles/PrimalItemArmor_RaptorSaddle.PrimalItemArmor_RaptorSaddle'";
      const isBlueprint = true;

      const mockSpawnCommandResponse = ['Spawn dinosaur command failed.'];
      mockDinosaurRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await dinosaurService.spawnSaddle(
        map,
        eosId,
        blueprint,
        isBlueprint,
      );

      expect(result).toEqual([{ result: 'error' }]);
    });
  });
});
