import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';
import { PlayerController } from './player.controller';

@Module({
  imports: [HttpModule],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository],
})
export class PlayerModule {}
