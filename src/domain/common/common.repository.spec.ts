import { Test, TestingModule } from '@nestjs/testing';
import { CommonRepository } from './common.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('CommonRepository', () => {
  let commonRepository: CommonRepository;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockHttpService = {
    post: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ASA_BOT_URL') {
        return 'http://localhost:3000';
      }
      if (key.includes('HOST_')) {
        return '127.0.0.1';
      }
      if (key.includes('PORT_')) {
        return '27015';
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonRepository,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    commonRepository = module.get<CommonRepository>(CommonRepository);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(commonRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call httpService.post with correct arguments', async () => {
      const map = 'TI';
      const commands = ['command1', 'command2'];
      const mockResponse = { data: ['success'] };
      mockHttpService.post.mockReturnValue(of(mockResponse));

      const result = await commonRepository.execute(map, commands);

      expect(mockConfigService.get).toHaveBeenCalledWith('ASA_BOT_URL');
      expect(mockConfigService.get).toHaveBeenCalledWith('HOST_TI');
      expect(mockConfigService.get).toHaveBeenCalledWith('PORT_TI');
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'http://localhost:3000/command/execute',
        {
          host: '127.0.0.1',
          rconPort: 27015,
          expectResult: true,
          commands: commands,
        },
      );
      expect(result).toEqual(['success']);
    });
  });

  describe('getMapHostsAndPorts', () => {
    it('should return the correct map hosts and ports', () => {
      const result = commonRepository.getMapHostsAndPorts();

      expect(mockConfigService.get).toHaveBeenCalledWith('HOST_TI');
      expect(mockConfigService.get).toHaveBeenCalledWith('PORT_TI');
      expect(result).toEqual({
        AB: { host: '127.0.0.1', port: 27015 },
        AS: { host: '127.0.0.1', port: 27015 },
        CA: { host: '127.0.0.1', port: 27015 },
        EX: { host: '127.0.0.1', port: 27015 },
        SE: { host: '127.0.0.1', port: 27015 },
        SV: { host: '127.0.0.1', port: 27015 },
        TC: { host: '127.0.0.1', port: 27015 },
        TI: { host: '127.0.0.1', port: 27015 },
      });
    });
  });
});
