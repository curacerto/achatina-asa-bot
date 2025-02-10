import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiKeyGuard } from '../../infrastructure/guard/api-key.guard';
import { PlayerEntity } from './player.entity';

@Controller('player')
@UseGuards(ApiKeyGuard)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async listPlayers(@Query('map') map: string): Promise<any> {
    return this.playerService.listPlayers(map);
  }

  @Get('discord/:discordId')
  async getPlayerByDiscordId(
    @Param('discordId') discordId: string,
  ): Promise<PlayerEntity> {
    return this.playerService.getPlayerByDiscordId(discordId);
  }
}
