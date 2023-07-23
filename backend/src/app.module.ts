import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';

import { SharedModule } from '@/shared/infrastructure';
import { UsersModule } from '@/users/infrastructure';
import { DatabaseService } from './shared/infrastructure/services';

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
    ],
    providers: [DatabaseService],
})
export class AppModule {}
