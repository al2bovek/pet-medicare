export default class UserModel {
  constructor(user) {
    this.id = user.id;
    this.user_name = user.user_name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.created_at; 
  }

  static fromDB(user) {
    if (!user) return null;
    return new UserModel(user);
  }

  static fromDBList(users) {
    return users.map((u) => new UserModel(u));
  }

  toJSON() {
    return {
      id: this.id,
      user_name: this.user_name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}
