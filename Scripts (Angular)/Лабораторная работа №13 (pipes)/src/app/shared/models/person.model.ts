export class Person {
    public id: number;
    public firstname: string;
    public lastname: string;
    public phone: string;
    constructor(firstname: string, lastname: string, phone: string ,id?: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
    }
}