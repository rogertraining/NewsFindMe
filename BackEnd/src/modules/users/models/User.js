import crypto from "crypto"

export class User {
  constructor(id, firstname, lastname, email, password) {
    this.id = id
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.created_at = new Date()
  }
}
