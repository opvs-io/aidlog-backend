import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@aidlog/shared/decorators/current-user.decorator';
import { UnsavedUserAuthGuard } from '@aidlog/shared/guards/unsaved-user-auth.guard';
import { SupabaseAuthPayload } from '@aidlog/shared/interfaces/supabase-auth-payload.interface';

import { CreateUserDto } from '@aidlog/users/dto/create-user.dto';

import { UsersService } from '@aidlog/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UnsavedUserAuthGuard)
  @Post('/')
  async create(
    @Body() dto: CreateUserDto,
    @CurrentUser() user: SupabaseAuthPayload,
  ) {
    dto.uid = user.sub;
    return this.usersService.findOneOrCreate(dto);
  }
}
