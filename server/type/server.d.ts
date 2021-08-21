export interface AuthUser {
  userId: string;
  name?: string;
  alias?: string;
  mobile?: string;
  email?: string;
  avatar?: string;
  role?: string[];
  status?: number;
}
