import { Test, TestingModule } from '@nestjs/testing';
import { DinosaurRepository } from './dinosaur.repository';
import { CommonRepository } from '../common/common.repository';

describe('DinosaurRepository', () => {
  let dinosaurRepository: DinosaurRepository;
  let commonRepository: CommonRepository;

  const mockCommonRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DinosaurRepository,
        {
          provide: CommonRepository,
          useValue: mockCommonRepository,
        },
      ],
    }).compile();

    dinosaurRepository = module.get<DinosaurRepository>(DinosaurRepository);
    commonRepository = module.get<CommonRepository>(CommonRepository);
  });

  it('should be defined', () => {
    expect(dinosaurRepository).toBeDefined();
  });

  describe('spawnCommand', () => {
    it('should call commonRepository.execute with correct arguments', async () => {
      const map = 'TheIsland';
      const commands = ['command1', 'command2'];
      const mockResponse = ['success'];
      mockCommonRepository.execute.mockResolvedValue(mockResponse);

      const result = await dinosaurRepository.spawnCommand(map, commands);

      expect(commonRepository.execute).toHaveBeenCalledWith(map, commands);
      expect(result).toEqual(mockResponse);
    });
  });
});
