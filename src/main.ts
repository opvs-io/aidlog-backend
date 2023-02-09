import helmet from '@fastify/helmet';

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { globalExceptionFilter } from '@aidlog/shared/filters/global-exception.filter';
import { ConsoleLogger } from '@aidlog/shared/loggers/console.logger';
import { validationPipe } from '@aidlog/shared/pipes/validation.pipe';

import { AppModule } from '@aidlog/app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: new ConsoleLogger().logger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  app.useGlobalFilters(globalExceptionFilter);

  app.useGlobalPipes(validationPipe);

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });

  await app.listen(3000);
}

bootstrap();
