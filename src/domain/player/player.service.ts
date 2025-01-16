import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './player.repository';

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
}
