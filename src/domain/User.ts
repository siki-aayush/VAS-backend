interface User {
  id: number;
  first_name: string;
  last_name: string;
  ethnicty: string;
  gender: string;
  email: string;
  date: string;
  province: string;
  district: string;
  street: string;
  insurance_id: string;
  insurance_provider: string;
  member_id: string;
  document: any;
  password: string;
}

export type UserToCreate = Omit<User, "id">;

export type UserWithoutPass = Omit<UserToCreate, "password">;

export default User;
