import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { CurrentUser } from '@aidlog/shared/decorators/current-user.decorator';
import { UserAuthGuard } from '@aidlog/shared/guards/user-auth.guard';

import { CreateRecordDto } from '@aidlog/records/dto/create-record.dto';

import { RecordsService } from '@aidlog/records/records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @UseGuards(UserAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateRecordDto, @CurrentUser() user: User) {
    dto.creatorId = user.uid;
    return this.recordsService.create(dto);
  }
}
