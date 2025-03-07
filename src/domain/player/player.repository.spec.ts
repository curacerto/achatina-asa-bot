import { Test, TestingModule } from '@nestjs/testing';
import { PlayerRepository } from './player.repository';
import { CommonRepository } from '../common/common.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('PlayerRepository', () => {
  let playerRepository: PlayerRepository;
  let commonRepository: CommonRepository;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockCommonRepository = {
    execute: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ASA_BOT_URL') {
        return 'http://localhost:3000';
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerRepository,
        {
          provide: CommonRepository,
          useValue: mockCommonRepository,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    playerRepository = module.get<PlayerRepository>(PlayerRepository);
    commonRepository = module.get<CommonRepository>(CommonRepository);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(playerRepository).toBeDefined();
  });

  describe('listPlayers', () => {
    it('should call commonRepository.execute with correct arguments', async () => {
      const map = 'TheIsland';
      const mockResponse = ['Player1', 'Player2'];
      mockCommonRepository.execute.mockResolvedValue(mockResponse);

      const result = await playerRepository.listPlayers(map);

      expect(commonRepository.execute).toHaveBeenCalledWith(map, [
        'listplayers',
      ]);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPlayerByDiscordId', () => {
    it('should call httpService.get with correct arguments', async () => {
      const discordId = '12345';
      const mockResponse = { name: 'Player1', steamId: '67890' };
      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await playerRepository.getPlayerByDiscordId(discordId);

      expect(configService.get).toHaveBeenCalledWith('ASA_BOT_URL');
      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:3000/playerRegistration/discordId/12345',
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
