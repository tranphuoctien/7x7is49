import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.USER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.tokenService = {
      options: {
        port: process.env.TOKEN_SERVICE_PORT,
        host: process.env.TOKEN_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
