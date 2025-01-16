import { CommonRepository } from '../common/common.repository';

export class ResourceRepository {
  constructor(private readonly commonRepository: CommonRepository) {}

  async spawnItem(map: string, commands: string[]): Promise<any> {
    return this.commonRepository.execute(map, commands);
  }
}
