import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  const mockItemService = {
    spawnItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule], // Import ConfigModule here
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(itemController).toBeDefined();
  });

  describe('spawnItem', () => {
    it('should call itemService.spawnItem with correct arguments', async () => {
      const map = 'TheIsland';
      const eosId = '12345';
      const blueprint =
        "Blueprint'/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSword.PrimalItem_WeaponSword'";
      const isBlueprint = true;
      const category = 'weapons';
      const item = 'sword';

      const mockResponse = [{ result: 'ok' }];
      mockItemService.spawnItem.mockResolvedValue(mockResponse);

      const result = await itemController.spawnItem(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );

      expect(itemService.spawnItem).toHaveBeenCalledWith(
        map,
        eosId,
        blueprint,
        isBlueprint,
        category,
        item,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
