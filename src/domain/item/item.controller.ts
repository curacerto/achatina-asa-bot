import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';
import { ItemService } from './item.service';

@Controller('item')
@UseGuards(ApiKeyGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('spawn-item')
  async spawnItem(
    @Body('map') map: string,
    @Body('eosId') eosId: string,
    @Body('blueprint') blueprint: string,
    @Body('isBlueprint') isBlueprint: boolean,
  ): Promise<any> {
    return this.itemService.spawnItem(map, eosId, blueprint, isBlueprint);
  }
}
