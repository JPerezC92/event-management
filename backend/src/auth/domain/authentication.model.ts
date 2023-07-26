export class Authentication {
    readonly accessToken: string;
    readonly refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    static create(accessToken: string, refreshToken: string): Authentication {
        return new Authentication(accessToken, refreshToken);
    }
}
