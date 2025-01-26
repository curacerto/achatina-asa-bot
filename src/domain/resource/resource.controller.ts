import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';
import { ResourceService } from './resource.service';

@Controller('resource')
@UseGuards(ApiKeyGuard)
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('spawn-item')
  async spawnItem(
    @Body('map') map: string,
    @Body('eosId') eosId: string,
    @Body('blueprint') blueprint: string,
    @Body('quantity') quantity: number,
  ): Promise<any> {
    return this.resourceService.spawnItem(map, eosId, quantity, blueprint);
  }
}
