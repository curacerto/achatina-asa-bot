import { Test, TestingModule } from '@nestjs/testing';
import { ItemRepository } from './item.repository';
import { CommonRepository } from '../common/common.repository';

describe('ItemRepository', () => {
  let itemRepository: ItemRepository;
  let commonRepository: CommonRepository;

  const mockCommonRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemRepository,
        {
          provide: CommonRepository,
          useValue: mockCommonRepository,
        },
      ],
    }).compile();

    itemRepository = module.get<ItemRepository>(ItemRepository);
    commonRepository = module.get<CommonRepository>(CommonRepository);
  });

  it('should be defined', () => {
    expect(itemRepository).toBeDefined();
  });

  describe('spawnCommand', () => {
    it('should call commonRepository.execute with correct arguments', async () => {
      const map = 'TheIsland';
      const commands = ['command1', 'command2'];
      const mockResponse = ['success'];
      mockCommonRepository.execute.mockResolvedValue(mockResponse);

      const result = await itemRepository.spawnCommand(map, commands);

      expect(commonRepository.execute).toHaveBeenCalledWith(map, commands);
      expect(result).toEqual(mockResponse);
    });
  });
});
