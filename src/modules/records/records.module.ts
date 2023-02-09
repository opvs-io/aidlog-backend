import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { RecordsController } from '@aidlog/records/records.controller';

import { UsersModule } from '@aidlog/users/users.module';

import { RecordsService } from '@aidlog/records/records.service';

@Module({
  imports: [PassportModule.register({}), UsersModule],
  controllers: [RecordsController],
  providers: [PrismaService, RecordsService],
})
export class RecordsModule {}
