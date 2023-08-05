import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';

import { AuthModule } from '@/auth/infrastructure';
import { EventsModule } from '@/events/infrastructure';
import { SharedModule } from '@/shared/infrastructure';
import { UsersModule } from '@/users/infrastructure';
import { AttendeesModule } from 'src/attendees/infrastructure';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            context: ({ req, res }: { req: Request; res: Response }) => {
                try {
                    return { req, res };
                } catch (error) {
                    return console.log(error);
                }
            },

            formatError: (error) => {
                const originalError = error?.extensions?.originalError || {};
                const code =
                    typeof originalError === 'object' && 'code' in originalError
                        ? originalError.code
                        : error?.extensions?.code;

                return {
                    ...error,
                    extensions: originalError
                        ? { code, stacktrace: error?.extensions?.stacktrace }
                        : error.extensions,
                } as GraphQLFormattedError;
            },
        }),
        UsersModule,
        SharedModule,
        AuthModule,
        EventsModule,
        AttendeesModule,
    ],
})
export class AppModule {}
