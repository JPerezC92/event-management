import { eventEndpoint } from './eventEndpoint.schema';

export const eventFind = eventEndpoint.pick({
    id: true,
});
