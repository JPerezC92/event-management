import { Event, EventSearch, EventsRepository } from '@/events/domain';
import { UseCase } from '@/shared/application';
import { Pagination } from '@/shared/domain';

type SearchInput = EventSearch;

interface SearchOutput {
    eventList: Event[];
    info: Pagination;
}

export function Search(
    eventsRepository: EventsRepository,
): UseCase<SearchOutput, SearchInput> {
    return {
        async execute({ page = 1, limit = 10, name, description, userId }) {
            const eventList = await eventsRepository.search({
                page,
                limit,
                name,
                description,
                userId,
            });

            return eventList;
        },
    };
}
