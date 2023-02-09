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

  async findAllByCreator(creatorId: string): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { creatorId },
    });
  }

  async findAllByOrganization(organizationId: number): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { organizationId },
    });
  }

  async create(dto: CreateRecordDto): Promise<Record> {
    const creator = await this.usersService.findOneByUid(dto.creatorId);

    if (!creator.organizationId) {
    }

    const record = await this.prisma.record.create({
      data: {
        destination: dto.destination,
        amount: dto.amount,
        productCode: dto.productCode,
        creatorId: dto.creatorId,
        organizationId: creator.organizationId,
      },
    });

    return record;
  }
}
