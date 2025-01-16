import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerRepository {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('ASA_BOT_URL');
  }

  async listPlayers(map: string): Promise<any> {
    const { host, port } = this.getMapHostsAndPorts()[map];
    const body = {
      host: host,
      rconPort: port,
      expectResult: true,
      commands: ['listplayers'],
    };
    const response = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/command/execute`, body),
    );
    return response.data;
  }

  getMapHostsAndPorts(): { [key: string]: { host: string; port: number } } {
    const maps = ['TI', 'SE', 'TC', 'AB', 'CA', 'EX'];
    const result: { [key: string]: { host: string; port: number } } = {};

    maps.forEach((map) => {
      const host = this.configService.get<string>(`HOST_${map}`);
      const port = Number(this.configService.get<string>(`PORT_${map}`));
      result[map] = { host, port };
    });

    return result;
  }
}
