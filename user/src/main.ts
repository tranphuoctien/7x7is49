import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: (new ConfigService()).get('port')
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen((new ConfigService()).get('httpPort'));
}
bootstrap();
