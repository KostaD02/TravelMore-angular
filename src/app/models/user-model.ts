export class User {
  public name: string;
  public lastname: string;
  public age: number;
  public email: string;
  public gender: string;
  public password: string;
  public img: string;
  public type: string;
  constructor(
    name: string,
    lastname: string,
    age: number,
    email: string,
    gender: string,
    password: string,
    img: string,
    type: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.img = img;
    this.type = type;
  }
}
