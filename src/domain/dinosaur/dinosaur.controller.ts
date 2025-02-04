import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';
import { DinosaurService } from './dinosaur.service';

@Controller('dinosaur')
@UseGuards(ApiKeyGuard)
export class DinosaurController {
  constructor(private readonly dinosaurService: DinosaurService) {}

  @Post('spawn-dino')
  async spawnItem(
    @Body('map') map: string,
    @Body('eosId') eosId: string,
    @Body('blueprint') blueprint: string,
  ): Promise<any> {
    return this.dinosaurService.spawnDinosaur(map, eosId, blueprint);
  }

  @Post('spawn-saddle')
  async spawnSaddle(
    @Body('map') map: string,
    @Body('eosId') eosId: string,
    @Body('blueprint') blueprint: string,
    @Body('isBlueprint') isBlueprint: boolean,
  ): Promise<any> {
    return this.dinosaurService.spawnSaddle(map, eosId, blueprint, isBlueprint);
  }
}
