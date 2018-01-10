export class User {
    constructor(
        public username: string,
        public password: string,
        public passwordRepeat?: string,
        public isAdmin: boolean
    ) { }
}