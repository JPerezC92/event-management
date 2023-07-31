import { eventEndpoint } from './eventEndpoint.schema';

export const eventDelete = eventEndpoint.pick({
    id: true,
});
