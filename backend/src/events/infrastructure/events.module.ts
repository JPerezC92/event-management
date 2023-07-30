import { Module } from '@nestjs/common';

import { SharedModule } from '@/shared/infrastructure';
import { EventsResolver } from './events.resolver';
import { EventsService } from './services';

@Module({
    providers: [EventsResolver, EventsService],
    imports: [SharedModule],
})
export class EventsModule {}
