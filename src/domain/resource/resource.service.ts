import { ResourceRepository } from './resource.repository';

export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async spawnItem(
    map: string,
    eosId: string,
    quantity: number,
    blueprint: string,
  ): Promise<any> {
    const resourceBlueprint = blueprint.split("'")[1];
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ${resourceBlueprint} quantity=${quantity}`,
    ];
    const response = await this.resourceRepository.spawnItem(map, commands);
    if (response.startsWith('Spawnitem command successful.')) {
      return { result: 'ok' };
    } else {
      return { result: 'error' };
    }
  }
}
