import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { PlayerEntity } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async listPlayers(map: string): Promise<any> {
    return new Promise((resolve) => {
      this.playerRepository.listPlayers(map).then((playersResult) => {
        if (playersResult[0] === 'No Players Connected') {
          resolve([]);
          return;
        }
        const players = playersResult[0].split('\n');
        const playerList = players.map((row) => {
          const [id, rest] = row.split('.');
          const [name, eosId] = rest.split(', ');
          return { id, name: name.trim(), eosId, map };
        });
        resolve(playerList);
      });
    });
  }

  async getPlayerByDiscordId(discordId: string): Promise<PlayerEntity> {
    const response =
      await this.playerRepository.getPlayerByDiscordId(discordId);
    const playerEntity: PlayerEntity = new PlayerEntity();
    playerEntity.id = response.discordId === discordId ? discordId : null;
    playerEntity.name = response.discordUsername;
    playerEntity.eos_id = response.netId;
    return playerEntity;
  }
}
