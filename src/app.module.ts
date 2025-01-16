import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './domain/player/player.module';
import { AxiosInterceptor } from './infrastructure/interceptor/axios.interceptor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the module globally available
    }),
    PlayerModule,
    HttpModule, // Import HttpModule here
  ],
  controllers: [AppController],
  providers: [AppService, AxiosInterceptor],
})
export class AppModule {}
