import { CommonRepository } from '../common/common.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemRepository {
  constructor(private readonly commonRepository: CommonRepository) {}

  async spawnCommand(map: string, commands: string[]): Promise<any> {
    return await this.commonRepository.execute(map, commands);
  }
}
