import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';

@Injectable()
export class PlayerRepository {
  constructor(private readonly commonRepository: CommonRepository) {}

  async listPlayers(map: string): Promise<any> {
    const commands = ['listplayers'];
    return this.commonRepository.execute(map, commands);
  }
}
