import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResourceRepository } from './resource.repository';
import { ResourceController } from './resource.controller';
import { CommonRepository } from '../common/common.repository';
import { ResourceService } from './resource.service';

@Module({
  imports: [HttpModule],
  controllers: [ResourceController],
  providers: [ResourceService, ResourceRepository, CommonRepository],
})
export class ResourceModule {}
