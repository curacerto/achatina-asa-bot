import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';
import { PlayerController } from './player.controller';
import { CommonRepository } from '../common/common.repository';

@Module({
  imports: [HttpModule],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository, CommonRepository],
})
export class PlayerModule {}
