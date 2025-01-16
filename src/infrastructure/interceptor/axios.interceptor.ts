import { Injectable } from '@nestjs/common';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosInterceptor {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const apiKey = this.configService.get<string>('ASA_BOT_API_KEY');
        config.headers['Authorization'] = `BOT ${apiKey}`;
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
        config.headers['User-Agent'] = 'MyApp/1.0';
        config.headers['Cache-Control'] = 'no-cache';

        console.log(
          `Outgoing Request: ${config.method?.toUpperCase()} ${config.url}`,
        );
        console.log('Request Headers:', config.headers);
        console.log('Request Body:', config.data);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  private initializeResponseInterceptor() {
    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `Incoming Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
        );
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
}
