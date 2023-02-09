import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { UsersController } from '@aidlog/users/users.controller';

import { UsersService } from '@aidlog/users/users.service';

@Module({
  imports: [PassportModule.register({})],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
