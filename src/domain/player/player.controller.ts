import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';

@Controller('player')
@UseGuards(ApiKeyGuard)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async listPlayers(@Query('map') map: string): Promise<any> {
    return this.playerService.listPlayers(map);
  }
}
