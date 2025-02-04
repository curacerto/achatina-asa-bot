import { Injectable } from '@nestjs/common';
import { DinosaurRepository } from './dinosaur.repository';
import * as seedrandom from 'seedrandom';

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
    const response: [] = await this.dinosaurRepository.spawnCommand(
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

  async spawnSaddle(
    map: string,
    eosId: string,
    blueprint: string,
    isBlueprint: boolean,
  ): Promise<any> {
    console.log('Spawn saddle ', map, eosId, blueprint, isBlueprint);
    let saddleBlueprint = blueprint;
    if (!blueprint && blueprint.startsWith('Blueprint')) {
      saddleBlueprint = blueprint.split("'")[1];
    }
    const seed = Date.now();
    seedrandom(seed.toString(), { global: true });
    const armor = (Math.random() * (352.68 - 100.0) + 100.0).toFixed(2);
    const blueprintString = isBlueprint ? ' blueprint=true' : '';
    const commands = [
      `scriptcommand asabot spawnitem ${eosId} ''${saddleBlueprint}'' quantity=1 quality=ascendant armor=${armor}${blueprintString}`,
    ];
    const response: [] = await this.dinosaurRepository.spawnCommand(
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
