export class User {
    constructor(
        public name: string,
        public email: string,
        public uid?: string,
        public role?: string,
        public avatar?: string,
        public password?: string
    ) {}
}