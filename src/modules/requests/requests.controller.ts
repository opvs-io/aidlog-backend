import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Request, User } from '@prisma/client';

import { CurrentUser } from '@aidlog/shared/decorators/current-user.decorator';
import { UserAuthGuard } from '@aidlog/shared/guards/user-auth.guard';
import { OrganizationMemberAuthGuard } from '@aidlog/shared/guards/organization-member-auth.guard';

import { CreateRequestDto } from '@aidlog/requests/dto/create-request.dto';
import { FindAllByRequesterParamsDto } from '@aidlog/requests/dto/find-all-by-requester-params.dto';
import { FindAllByOrganizationParamsDto } from '@aidlog/requests/dto/find-all-by-organization-params.dto';

import { RequestsService } from '@aidlog/requests/requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('/requester/:uid')
  async findAllByRequester(
    @Param() params: FindAllByRequesterParamsDto,
  ): Promise<Request[]> {
    return this.requestsService.findAllByRequester(params.uid);
  }

  @Get('/organization/:organizationId')
  async findAllByOrganization(
    @Param() params: FindAllByOrganizationParamsDto,
  ): Promise<Request[]> {
    return this.requestsService.findAllByOrganization(params.organizationId);
  }

  @UseGuards(UserAuthGuard, OrganizationMemberAuthGuard)
  @Post('/')
  async create(
    @Body() dto: CreateRequestDto,
    @CurrentUser() user: User,
  ): Promise<Request> {
    dto.requesterUid = user.uid;
    return this.requestsService.create(dto);
  }
}
