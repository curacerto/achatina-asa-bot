import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlayerRepository {
  private readonly apiUrl: string;

  constructor(
    private readonly commonRepository: CommonRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('ASA_BOT_URL');
  }

  async listPlayers(map: string): Promise<any> {
    const commands = ['listplayers'];
    return this.commonRepository.execute(map, commands);
  }

  async getPlayerByDiscordId(discordId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.apiUrl}/playerRegistration/discordId/${discordId}`,
      ),
    );
    return response.data;
  }
}
