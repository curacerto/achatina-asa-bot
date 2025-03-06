import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { ArmorMaximumsEnumerator } from './constant/armor-maximums.enumerator';
import { ItemCategoryEnumerator } from './constant/item-category.enumerator';
import { ItemMaximumsService } from './item-maximums.service';
import { ItemMaximums } from './item-maximums';

describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: ItemRepository;

  const mockItemRepository = {
    spawnCommand: jest.fn(),
  };

  const mockItemMaximumsService = {
    getItemMaximums: jest.fn(),
    getRandomDamage: jest.fn(),
    getRandomArmor: jest.fn(),
    getRandomDurability: jest.fn(),
    getRandomRating: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: ItemRepository,
          useValue: mockItemRepository,
        },
        {
          provide: ItemMaximumsService,
          useValue: mockItemMaximumsService,
        },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<ItemRepository>(ItemRepository);

    const mockItemMaximums = new ItemMaximums(2000, 1500, 1000, 2000);
    mockItemMaximumsService.getItemMaximums.mockReturnValue(mockItemMaximums);
    mockItemMaximumsService.getRandomDamage.mockReturnValue(755);
    mockItemMaximumsService.getRandomArmor.mockReturnValue(1410.72);
    mockItemMaximumsService.getRandomDurability.mockReturnValue(2085);
    mockItemMaximumsService.getRandomRating.mockReturnValue(2000);
  });

  it('should be defined', () => {
    expect(itemService).toBeDefined();
  });

  describe('spawnItem', () => {
    it('should call spawnCommand with correct arguments and return mapped response', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword'";
      const isBlueprint = true;
      const category = ItemCategoryEnumerator.WEAPON;
      const item = 'sword';

      const mockSpawnCommandResponse = ['Spawn item command successful.'];
      mockItemRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await itemService.spawnItem(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );

      expect(itemRepository.spawnCommand).toHaveBeenCalledTimes(1);
      expect(itemRepository.spawnCommand).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([
        {
          result: 'ok',
          commands: [
            "scriptcommand asabot spawnitem 12345 ''/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword'' quantity=1 quality=ascendant damage=755 blueprint=true durability=2085 rating=2000",
          ],
        },
      ]);
    });

    it('should handle blueprint names not starting with Blueprint', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        '/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword';
      const isBlueprint = true;
      const category = ItemCategoryEnumerator.WEAPON;
      const item = 'sword';

      const mockSpawnCommandResponse = ['Spawn item command successful.'];
      mockItemRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await itemService.spawnItem(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );

      expect(itemRepository.spawnCommand).toHaveBeenCalledTimes(1);
      expect(itemRepository.spawnCommand).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([
        {
          result: 'ok',
          commands: [
            "scriptcommand asabot spawnitem 12345 ''/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword'' quantity=1 quality=ascendant damage=755 blueprint=true durability=2085 rating=2000",
          ],
        },
      ]);
    });

    it('should use armor commands when category is not weapons', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Armor/PrimalItemArmor_FlakHelmet.PrimalItemArmor_FlakHelmet'";
      const isBlueprint = true;
      const category = ItemCategoryEnumerator.ARMOR;
      const item = ArmorMaximumsEnumerator.maximums.FLAK.code;

      const mockSpawnCommandResponse = ['Spawn item command successful.'];
      mockItemRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await itemService.spawnItem(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );

      expect(itemRepository.spawnCommand).toHaveBeenCalledTimes(1);
      expect(itemRepository.spawnCommand).toHaveBeenCalledWith(
        map,
        expect.any(Array),
      );
      expect(result).toEqual([
        {
          result: 'ok',
          commands: [
            "scriptcommand asabot spawnitem 12345 ''/Game/PrimalEarth/CoreBlueprints/Armor/PrimalItemArmor_FlakHelmet.PrimalItemArmor_FlakHelmet'' quantity=1 quality=ascendant armor=1410.72 blueprint=true durability=2085 rating=2000",
          ],
        },
      ]);
    });

    it('should return error result when spawn command fails', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword'";
      const isBlueprint = true;
      const category = ItemCategoryEnumerator.WEAPON;
      const item = 'sword';

      const mockSpawnCommandResponse = ['Spawn item command failed.'];
      mockItemRepository.spawnCommand.mockResolvedValue(
        mockSpawnCommandResponse,
      );

      const result = await itemService.spawnItem(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );

      expect(result).toEqual([{ result: 'error' }]);
    });
  });
});
