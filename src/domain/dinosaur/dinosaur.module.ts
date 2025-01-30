import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DinosaurController } from './dinosaur.controller';
import { DinosaurService } from './dinosaur.service';
import { DinosaurRepository } from './dinosaur.repository';
import { CommonRepository } from '../common/common.repository';

@Module({
  imports: [HttpModule],
  controllers: [DinosaurController],
  providers: [DinosaurService, DinosaurRepository, CommonRepository],
})
export class DinosaurModule {}
