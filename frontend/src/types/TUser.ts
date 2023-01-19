export type TUser = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  password?: string;
};