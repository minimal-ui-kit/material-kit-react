export interface CreateUserBody {
  fname: string;
  lname: string;
  email: string;
  password?: string;
  country: string;
  pledgeAmount: number;
  secret: string;
}

export interface UserLoginBody {
  email: string;
  password: string;
}
