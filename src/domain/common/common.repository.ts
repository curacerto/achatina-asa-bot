import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { MapEnumerator } from '../map/constant/map.enumerator';

@Injectable()
export class CommonRepository {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('ASA_BOT_URL');
  }

  async execute(map: string, commands: string[]): Promise<any> {
    const { host, port } = this.getMapHostsAndPorts()[map];
    const body = {
      host: host,
      rconPort: port,
      expectResult: true,
      commands: commands,
    };
    const response = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/command/execute`, body),
    );
    return response.data;
  }

  getMapHostsAndPorts(): { [key: string]: { host: string; port: number } } {
    const maps = MapEnumerator.mapArray;
    const result: { [key: string]: { host: string; port: number } } = {};

    maps.forEach((map) => {
      const host = this.configService.get<string>(`HOST_${map}`);
      const port = Number(this.configService.get<string>(`PORT_${map}`));
      result[map] = { host, port };
    });

    return result;
  }
}
