import { Injectable } from '@nestjs/common';
import { DinosaurRepository } from './dinosaur.repository';

@Injectable()
export class DinosaurService {
  constructor(private readonly dinosaurRepository: DinosaurRepository) {}

  async spawnDinosaur(
    map: string,
    eosId: string,
    blueprint: string,
  ): Promise<any> {
    console.log('Spawn dinosaur ', map, eosId, blueprint);
    let dinosaurBlueprint = blueprint;
    if (!blueprint && blueprint.startsWith('Blueprint')) {
      dinosaurBlueprint = blueprint.split("'")[1];
    }
    const commands = [
      `scriptcommand asabot spawndino ${eosId} ''${dinosaurBlueprint}'' level=225`,
    ];
    const response: [] = await this.dinosaurRepository.spawnDinosaur(
      map,
      commands,
    );
    console.log(response);
    const mappedResponse: { result: string }[] = [];
    response.forEach((rsp: string) => {
      let result: { result: string };
      if (rsp.startsWith('Spawn dinosaur command successful.')) {
        result = { result: 'ok' };
      } else {
        result = { result: 'error' };
      }
      mappedResponse.push(result);
    });
    return mappedResponse;
  }
}
