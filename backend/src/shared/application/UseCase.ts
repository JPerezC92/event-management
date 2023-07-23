export interface UseCase<Out = void, In = void> {
    execute(input: In): Promise<Out>;
}
