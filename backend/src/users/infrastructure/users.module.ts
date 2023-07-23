import { SharedModule } from '@/shared/infrastructure';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';

@Module({
    providers: [UsersResolver, UsersService],
    imports: [SharedModule],
})
export class UsersModule {}
