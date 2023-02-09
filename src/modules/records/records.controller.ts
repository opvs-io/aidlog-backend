import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { CurrentUser } from '@aidlog/shared/decorators/current-user.decorator';
import { UserAuthGuard } from '@aidlog/shared/guards/user-auth.guard';

import { CreateRecordDto } from '@aidlog/records/dto/create-record.dto';
import { FindAllByCreatorParamsDto } from '@aidlog/records/dto/find-all-by-creator-params.dto';
import { FindAllByOrganizationParamsDto } from '@aidlog/modules/records/dto/find-all-by-organization-params.dto';

import { RecordsService } from '@aidlog/records/records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get('/creator/:uid')
  async findAllByCreator(@Param() params: FindAllByCreatorParamsDto) {
    return this.recordsService.findAllByCreator(params.uid);
  }

  @Get('/organization/:organizationId')
  async findAllByOrganization(@Param() params: FindAllByOrganizationParamsDto) {
    return this.recordsService.findAllByOrganization(params.organizationId);
  }

  @UseGuards(UserAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateRecordDto, @CurrentUser() user: User) {
    dto.creatorId = user.uid;
    return this.recordsService.create(dto);
  }
}
