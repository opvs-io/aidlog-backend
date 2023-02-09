import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { RequestsController } from '@aidlog/requests/requests.controller';

import { UsersModule } from '@aidlog/users/users.module';

import { RequestsService } from '@aidlog/requests/requests.service';

@Module({
  imports: [PassportModule.register({}), UsersModule],
  controllers: [RequestsController],
  providers: [PrismaService, RequestsService],
})
export class RequestsModule {}
