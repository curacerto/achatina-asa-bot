import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { CommonRepository } from '../common/common.repository';

@Module({
  imports: [HttpModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository, CommonRepository],
})
export class ItemModule {}
