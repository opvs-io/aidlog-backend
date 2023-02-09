import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from '@aidlog/shared/services/prisma.service';

import { CreateUserDto } from '@aidlog/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async findOneByUid(uid: string): Promise<User> {
    let user: User = await this.cacheManager.get(`user:${uid}`);

    if (user) {
      return user;
    }

    user = await this.prisma.user.findUnique({
      where: { uid },
    });

    await this.cacheManager.set(`user:${uid}`, user);

    return user;
  }

  async findOneOrCreate(dto: CreateUserDto): Promise<User> {
    const existentUser = await this.findOneByUid(dto.uid);

    if (existentUser) {
      return existentUser;
    }

    const user = await this.prisma.user.create({
      data: {
        uid: dto.uid,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    await this.cacheManager.set(`user:${dto.uid}`, user);

    return user;
  }
}
