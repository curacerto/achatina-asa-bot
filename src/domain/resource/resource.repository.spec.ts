import { Test, TestingModule } from '@nestjs/testing';
import { ResourceRepository } from './resource.repository';
import { CommonRepository } from '../common/common.repository';

describe('ResourceRepository', () => {
  let resourceRepository: ResourceRepository;
  let commonRepository: CommonRepository;

  const mockCommonRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceRepository,
        {
          provide: CommonRepository,
          useValue: mockCommonRepository,
        },
      ],
    }).compile();

    resourceRepository = module.get<ResourceRepository>(ResourceRepository);
    commonRepository = module.get<CommonRepository>(CommonRepository);
  });

  it('should be defined', () => {
    expect(resourceRepository).toBeDefined();
  });

  describe('spawnItem', () => {
    it('should call commonRepository.execute with correct arguments', async () => {
      const map = 'TheIsland';
      const commands = ['command1', 'command2'];
      const mockResponse = ['success'];
      mockCommonRepository.execute.mockResolvedValue(mockResponse);

      const result = await resourceRepository.spawnItem(map, commands);

      expect(commonRepository.execute).toHaveBeenCalledWith(map, commands);
      expect(result).toEqual(mockResponse);
    });
  });
});
