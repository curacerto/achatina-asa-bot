import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';
import { PlayerEntity } from './player.entity';

describe('PlayerService', () => {
  let playerService: PlayerService;
  let playerRepository: PlayerRepository;

  const mockPlayerRepository = {
    listPlayers: jest.fn(),
    getPlayerByDiscordId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: PlayerRepository,
          useValue: mockPlayerRepository,
        },
      ],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<PlayerRepository>(PlayerRepository);
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
  });

  describe('listPlayers', () => {
    it('should return an empty array when there are no players connected', async () => {
      const map = 'TheIsland';
      mockPlayerRepository.listPlayers.mockResolvedValue([
        'No Players Connected',
      ]);

      const result = await playerService.listPlayers(map);

      expect(playerRepository.listPlayers).toHaveBeenCalledWith(map);
      expect(result).toEqual([]);
    });

    it('should return a list of players when there are players connected', async () => {
      const map = 'TheIsland';
      const mockPlayersResult = ['1. Player1, 12345\n2. Player2, 67890'];
      mockPlayerRepository.listPlayers.mockResolvedValue(mockPlayersResult);

      const result = await playerService.listPlayers(map);

      expect(playerRepository.listPlayers).toHaveBeenCalledWith(map);
      expect(result).toEqual([
        { id: '1', name: 'Player1', eosId: '12345', map: 'TheIsland' },
        { id: '2', name: 'Player2', eosId: '67890', map: 'TheIsland' },
      ]);
    });
  });

  describe('getPlayerByDiscordId', () => {
    it('should return a PlayerEntity when a player is found', async () => {
      const discordId = '12345';
      const mockResponse = {
        discordId: '12345',
        discordUsername: 'Player1',
        netId: '67890',
      };
      mockPlayerRepository.getPlayerByDiscordId.mockResolvedValue(mockResponse);

      const result = await playerService.getPlayerByDiscordId(discordId);

      expect(playerRepository.getPlayerByDiscordId).toHaveBeenCalledWith(
        discordId,
      );
      expect(result).toEqual({
        id: '12345',
        name: 'Player1',
        eos_id: '67890',
      } as PlayerEntity);
    });
  });
});
