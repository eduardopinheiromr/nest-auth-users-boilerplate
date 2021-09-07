import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { UsersService } from './users.service';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
