import { Module } from '@nestjs/common';

import { SharedModule } from '@/shared/infrastructure';
import { AttendeesResolver } from './attendees.resolver';
import { AttendeesService } from './services';

@Module({
    providers: [AttendeesResolver, AttendeesService],
    imports: [SharedModule],
})
export class AttendeesModule {}
