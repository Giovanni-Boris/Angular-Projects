import { Token } from '../../shared/interfaces/token.model';
import { User } from '../../shared/interfaces/user.model';

export interface AuthState {
  token: Token | undefined;
  user: User;
  isFetching: boolean;
  error: string;
}

export const initialState: AuthState = {
  token: undefined,
  user: {
    Id: '',
    Username: '',
    Img: '',
    Status: 0,
    Age: 0,
    Email: '',
  },
  isFetching: false,
  error: "",
};
