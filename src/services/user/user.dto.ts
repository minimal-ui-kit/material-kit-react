export enum UserRole {
  Admin = 'ADMIN',
  Partner = 'PARTNER',
}

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  country: string;
  pledgeAmount: string;
  role: UserRole[];
}

export interface UserUpdateBody extends Omit<User, 'email' | 'pledgeAmount' | 'role'> {}
