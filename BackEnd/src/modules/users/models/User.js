export class User {
  constructor(id, firstname, lastname, email, password, preferences) {
    this.id = id
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.preferences = preferences;
    this.created_at = new Date()
  }
}
