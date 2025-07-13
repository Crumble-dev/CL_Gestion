import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options:{
         servers: ['nats://34.201.114.239:4222'], // si no funciona usar localhost
    }
  })
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
