import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('PlayerController', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;

  const mockPlayerService = {
    listPlayers: jest.fn(),
    getPlayerByDiscordId: jest.fn(),
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
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: mockPlayerService,
        },
        {
          provide: ConfigService, // Provide the mock ConfigService
          useValue: mockConfigService,
        },
      ],
    }).compile();

    playerController = module.get<PlayerController>(PlayerController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(playerController).toBeDefined();
  });

  describe('listPlayers', () => {
    it('should call playerService.listPlayers with correct arguments', async () => {
      const map = 'TheIsland';
      const mockResponse = [{ name: 'Player1' }, { name: 'Player2' }];
      mockPlayerService.listPlayers.mockResolvedValue(mockResponse);

      const result = await playerController.listPlayers(map);

      expect(playerService.listPlayers).toHaveBeenCalledWith(map);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPlayerByDiscordId', () => {
    it('should call playerService.getPlayerByDiscordId with correct arguments', async () => {
      const discordId = '12345';
      const mockResponse: PlayerEntity = {
        id: '12345',
        name: 'Player1',
        eos_id: '67890',
        map: 'TheIsland',
      };
      mockPlayerService.getPlayerByDiscordId.mockResolvedValue(mockResponse);

      const result = await playerController.getPlayerByDiscordId(discordId);

      expect(playerService.getPlayerByDiscordId).toHaveBeenCalledWith(
        discordId,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
