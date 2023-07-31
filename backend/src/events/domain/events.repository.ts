import { Event } from '@/events/domain';

export interface EventsRepository {
    save(event: Event): Promise<Event>;
    findById(id: Event['id']): Promise<Event | null>;
    update(event: Event): Promise<Event>;
    delete(event: Event): Promise<Event>;
}
