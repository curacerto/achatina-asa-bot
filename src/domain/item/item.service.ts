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
    category: string,
    item: string,
  ): Promise<any> {
    console.log(
      'Spawn item ',
      map,
      eosId,
      blueprint,
      isBlueprint,
      category,
      item,
    );
    let itemBlueprint = blueprint;
    if (!blueprint && blueprint.startsWith('Blueprint')) {
      itemBlueprint = blueprint.split("'")[1];
    }
    const seed = Date.now();
    seedrandom(seed.toString(), { global: true });
    const damage = Math.random() * (755 - 100) + 100;
    const maxArmor = item.includes('flak') ? 1737 : 500;
    const armor = Math.random() * (maxArmor - 500) + 500;
    const durability = Math.random() * (1737 - 100) + 100;
    const blueprintString = isBlueprint ? ' blueprint=true' : '';
    const rating = 50;
    const weaponCommands = `damage=${damage}${blueprintString} durability=${durability} rating=${rating}`;
    const armorCommands = `armor=${armor}${blueprintString} durability=${durability} rating=${rating}`;
    const extraCommands =
      category === 'weapons' ? weaponCommands : armorCommands;
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ''${itemBlueprint}'' quantity=1 quality=ascendant ${extraCommands}`,
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
