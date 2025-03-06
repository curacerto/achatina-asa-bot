import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { CommonRepository } from '../common/common.repository';
import { ItemMaximumsService } from './item-maximums.service';

@Module({
  imports: [HttpModule],
  controllers: [ItemController],
  providers: [
    ItemService,
    ItemRepository,
    CommonRepository,
    ItemMaximumsService,
  ],
})
export class ItemModule {}
