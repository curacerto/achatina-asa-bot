import { Test, TestingModule } from '@nestjs/testing';
import { ItemMaximumsService } from './item-maximums.service';
import { ItemMaximums } from './item-maximums';
import { ItemCategoryEnumerator } from './constant/item-category.enumerator';

describe('ItemMaximumsService', () => {
  let service: ItemMaximumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemMaximumsService],
    }).compile();

    service = module.get<ItemMaximumsService>(ItemMaximumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getItemMaximums', () => {
    it('should return correct maximums for flak armor', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.ARMOR,
        'flak',
      );
      expect(result).toEqual(new ItemMaximums(2085, 1410.72, 0, 2000));
    });

    it('should return correct maximums for hazard armor', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.ARMOR,
        'hazard',
      );
      expect(result).toEqual(new ItemMaximums(1485, 916.96, 0, 2000));
    });

    it('should return correct maximums for tek armor', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.ARMOR,
        'tek',
      );
      expect(result).toEqual(new ItemMaximums(1500, 1949.47, 0, 2000));
    });

    it('should return correct maximums for riot armor', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.ARMOR,
        'riot',
      );
      expect(result).toEqual(new ItemMaximums(1500, 1949.47, 0, 2000));
    });

    it('should return correct maximums for weapon', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.WEAPON,
        'sword',
      );
      expect(result).toEqual(new ItemMaximums(2000, 0, 755, 2000));
    });

    it('should return default maximums for unknown category', () => {
      const result = service.getItemMaximums('unknown', 'item');
      expect(result).toEqual(new ItemMaximums(1000, 500, 100, 2000));
    });

    it('should return correct maximums for fabricated_sniper_rifle', () => {
      const result = service.getItemMaximums(
        ItemCategoryEnumerator.WEAPON,
        'fabricated_sniper_rifle',
      );
      expect(result).toEqual(new ItemMaximums(2000, 0, 755, 2000));
    });
  });
});
