import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { CreateRecordDto } from '@aidlog/records/dto/create-record.dto';

import { UsersService } from '@aidlog/users/users.service';

@Injectable()
export class RecordsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async findAllByCreator(creatorUid: string): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { creatorUid },
    });
  }

  async findAllByOrganization(organizationId: number): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { organizationId },
    });
  }

  async create(dto: CreateRecordDto): Promise<Record> {
    const creator = await this.usersService.findOneByUid(dto.creatorUid);

    const record = await this.prisma.record.create({
      data: {
        destination: dto.destination,
        amount: dto.amount,
        productCode: dto.productCode,
        creatorUid: dto.creatorUid,
        description: dto.description,
        organizationId: creator.memberOrganizationId,
      },
    });

    return record;
  }
}
