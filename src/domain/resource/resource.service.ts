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
    return this.resourceRepository.spawnItem(map, commands);
  }
}
