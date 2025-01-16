import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResourceRepository } from './resource.repository';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ResourceRepository],
})
export class ResourceModule {}
