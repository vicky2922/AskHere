/**
 * Created by Vicky on 7/3/2017.
 */



export class UserObjectALL{
  _id:string;
  username:string;
  email:string;
  password:string;
  firstname:string;


  constructor(id: string, username: string, email: string, password: string, firstname: string) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
  }

  getid(){
    return this._id;
  }
  getusername(){
    return this.username;
  }
  getemail(){
    return this.email;
  }
  getpassword(){
    return this.password;
  }
  getfirstname(){
    return this.firstname;
  }
}
