interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserToCreate = Omit<User, "id">;

export type UserWithoutPass = Omit<UserToCreate, "password">;

export default User;
