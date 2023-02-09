import { CacheModule, Module } from '@nestjs/common';

import { RecordsModule } from '@aidlog/records/records.module';
import { UsersModule } from '@aidlog/users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000, // in ms, 1 min
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // in secs
      limit: 100,
    }),
    RecordsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
