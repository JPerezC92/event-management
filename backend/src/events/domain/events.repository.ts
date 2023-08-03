import { Event } from '@/events/domain';
import { Pagination } from '@/shared/domain';
import { EventSearch } from './eventSearch.model';

export interface EventsRepository {
    save(event: Event): Promise<Event>;
    findById(id: Event['id']): Promise<Event | null>;
    update(event: Event): Promise<Event>;
    delete(event: Event): Promise<Event>;
    search(
        eventSearch: EventSearch &
            Required<Pick<EventSearch, 'limit' | 'page'>>,
    ): Promise<{
        eventList: Event[];
        info: Pagination;
    }>;
}
