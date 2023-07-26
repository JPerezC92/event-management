export interface TokenCipher<T> {
    encrypt(payload: T): Promise<string>;
    /**
     * @throws { InvalidTokenError }
     */
    decrypt(token: string): Promise<T>;
}
