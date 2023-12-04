import { Token } from '../../shared/interfaces/token.model';
import { User } from '../../shared/interfaces/user.model';

export interface UserState {
  token: Token | undefined;
  user: User;
  isFetching: boolean;
  error: any;
}

export const initialState: UserState = {
  token: undefined,
  user: {
    id: '',
    username: '',
    img: '',
    status: 0,
    age: 0,
    email: '',
  },
  isFetching: false,
  error: "",
};
