import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';
import { ResourceService } from './resource.service';

@Controller('player')
@UseGuards(ApiKeyGuard)
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  async spawnItem(
    @Body('map') map: string,
    @Body('eosId') eosId: string,
    @Body('quantity') quantity: number,
    @Body('blueprint') blueprint: string,
  ): Promise<any> {
    return this.resourceService.spawnItem(map, eosId, quantity, blueprint);
  }
}
