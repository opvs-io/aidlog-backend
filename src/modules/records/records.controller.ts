import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Record, User } from '@prisma/client';

import { CurrentUser } from '@aidlog/shared/decorators/current-user.decorator';
import { OrganizationMemberAuthGuard } from '@aidlog/shared/guards/organization-member-auth.guard';
import { UserAuthGuard } from '@aidlog/shared/guards/user-auth.guard';

import { CreateRecordDto } from '@aidlog/records/dto/create-record.dto';
import { FindAllByCreatorParamsDto } from '@aidlog/records/dto/find-all-by-creator-params.dto';
import { FindAllByOrganizationParamsDto } from '@aidlog/records/dto/find-all-by-organization-params.dto';

import { RecordsService } from '@aidlog/records/records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get('/creator/:uid')
  async findAllByCreator(
    @Param() params: FindAllByCreatorParamsDto,
  ): Promise<Record[]> {
    return this.recordsService.findAllByCreator(params.uid);
  }

  @Get('/organization/:organizationId')
  async findAllByOrganization(
    @Param() params: FindAllByOrganizationParamsDto,
  ): Promise<Record[]> {
    return this.recordsService.findAllByOrganization(params.organizationId);
  }

  @UseGuards(UserAuthGuard, OrganizationMemberAuthGuard)
  @Post('/')
  async create(
    @Body() dto: CreateRecordDto,
    @CurrentUser() user: User,
  ): Promise<Record> {
    dto.creatorUid = user.uid;
    return this.recordsService.create(dto);
  }
}
