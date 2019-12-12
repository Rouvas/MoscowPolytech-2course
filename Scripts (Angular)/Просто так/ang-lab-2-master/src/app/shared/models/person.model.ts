export class Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public tel: string;

  constructor(firstName: string, lastName: string, tel: string, id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
  }
}
