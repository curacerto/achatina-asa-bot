import { ResourceRepository } from './resource.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async spawnItem(
    map: string,
    eosId: string,
    blueprint: string,
    quantity: number,
  ): Promise<any> {
    console.log('Spawn item ', map, eosId, blueprint, quantity);
    let resourceBlueprint = blueprint;
    if (!blueprint && blueprint.startsWith('Blueprint')) {
      resourceBlueprint = blueprint.split("'")[1];
    }
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ''${resourceBlueprint}'' quantity=${quantity}`,
    ];
    const response: [] = await this.resourceRepository.spawnItem(map, commands);
    console.log(response);
    const mappedResponse: { result: string }[] = [];
    response.forEach((rsp: string) => {
      let result: { result: string };
      if (rsp.startsWith('Spawnitem command successful.')) {
        result = { result: 'ok' };
      } else {
        result = { result: 'error' };
      }
      mappedResponse.push(result);
    });
    return mappedResponse;
  }
}
