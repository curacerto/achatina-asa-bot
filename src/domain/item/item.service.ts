import { Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { ItemMaximumsService } from './item-maximums.service';
import { ItemCategoryEnumerator } from './constant/item-category.enumerator';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly itemMaximumsService: ItemMaximumsService,
  ) {}

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
    category = category.toLowerCase();
    if (blueprint && blueprint.startsWith('Blueprint')) {
      itemBlueprint = blueprint.split("'")[1];
    }
    const itemMaximums = this.itemMaximumsService.getItemMaximums(
      category,
      item,
    );
    const damage = this.itemMaximumsService.getRandomDamage(itemMaximums);
    const armor = this.itemMaximumsService.getRandomArmor(itemMaximums);
    const durability =
      this.itemMaximumsService.getRandomDurability(itemMaximums);
    const rating = this.itemMaximumsService.getRandomRating(itemMaximums);

    const blueprintString = isBlueprint ? ' blueprint=true' : '';
    const weaponCommands = `damage=${damage}${blueprintString} durability=${durability} rating=${rating}`;
    const armorCommands = `armor=${armor}${blueprintString} durability=${durability} rating=${rating}`;
    const extraCommands =
      ItemCategoryEnumerator.WEAPON === category ||
      ItemCategoryEnumerator.TOOL === category
        ? weaponCommands
        : armorCommands;
    console.log(
      `scriptcommand asabot spawnitem ${eosId} ''${itemBlueprint}'' quantity=1 quality=ascendant ${extraCommands}`,
    );
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ''${itemBlueprint}'' quantity=1 quality=ascendant ${extraCommands}`,
    ];

    const response: [] = await this.itemRepository.spawnCommand(map, commands);

    console.log(response);
    const mappedResponse: { result: string }[] = [];
    response.forEach((rsp: string) => {
      let result: { result: string; commands?: string[] };
      if (rsp.startsWith('Spawn item command successful.')) {
        result = {
          result: 'ok',
          commands: commands,
        };
      } else {
        result = { result: 'error' };
      }
      mappedResponse.push(result);
    });
    return mappedResponse;
  }
}
