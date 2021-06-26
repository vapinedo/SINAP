export class Customer {
    constructor(
        public id = '',
        public name = '',
        public lastname = '',
        public email = '',
        public birthdate = 0,
        public category = '',
        public gender = '',
        public agreeTerms = false
    ) {}
}