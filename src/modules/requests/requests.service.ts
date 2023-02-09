import { Injectable } from '@nestjs/common';
import { Request } from '@prisma/client';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { CreateRequestDto } from '@aidlog/requests/dto/create-request.dto';

import { UsersService } from '@aidlog/users/users.service';

@Injectable()
export class RequestsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async findAllByRequester(requesterUid: string): Promise<Request[]> {
    return this.prisma.request.findMany({
      where: { requesterUid },
    });
  }

  async findAllByOrganization(organizationId: number): Promise<Request[]> {
    return this.prisma.request.findMany({
      where: { organizationId },
    });
  }

  async create(dto: CreateRequestDto): Promise<Request> {
    const creator = await this.usersService.findOneByUid(dto.requesterUid);

    const request = await this.prisma.request.create({
      data: {
        destination: dto.destination,
        amount: dto.amount,
        productCode: dto.productCode,
        requesterUid: dto.requesterUid,
        organizationId: creator.memberOrganizationId,
      },
    });

    return request;
  }
}
