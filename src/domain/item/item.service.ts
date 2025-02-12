import { Injectable } from '@nestjs/common';
import * as seedrandom from 'seedrandom';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async spawnItem(
    map: string,
    eosId: string,
    blueprint: string,
    isBlueprint: boolean,
  ): Promise<any> {
    console.log('Spawn item ', map, eosId, blueprint, isBlueprint);
    let itemBlueprint = blueprint;
    if (!blueprint && blueprint.startsWith('Blueprint')) {
      itemBlueprint = blueprint.split("'")[1];
    }
    const seed = Date.now();
    seedrandom(seed.toString(), { global: true });
    const damage = Math.random() * (755 - 100) + 100;
    const durability = Math.random() * (1737 - 100) + 100;
    const blueprintString = isBlueprint ? ' blueprint=true' : '';
    const rating = Math.random() * 50;
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ''${itemBlueprint}'' quantity=1 quality=ascendant damage=${damage}${blueprintString} durability=${durability} rating=${rating}`,
    ];
    const response: [] = await this.itemRepository.spawnCommand(map, commands);
    console.log(response);
    const mappedResponse: { result: string }[] = [];
    response.forEach((rsp: string) => {
      let result: { result: string };
      if (rsp.startsWith('Spawn item command successful.')) {
        result = { result: 'ok' };
      } else {
        result = { result: 'error' };
      }
      mappedResponse.push(result);
    });
    return mappedResponse;
  }
}
