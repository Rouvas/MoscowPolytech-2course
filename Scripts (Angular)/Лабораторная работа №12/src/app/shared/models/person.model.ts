export class Person {
    public id: number;
    public firstname: string;
    public lastname: string;
    constructor(firstname: string, lastname: string, id?: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}