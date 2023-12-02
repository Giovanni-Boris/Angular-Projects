import { Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { UserState } from "./user/user.state";


export function persistStateReducer(_reducer: ActionReducer<UserState>) {
  const sessionStorageKey = '__user';
  return (state: UserState | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = sessionStorage.getItem(sessionStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }
    const nextState = _reducer(state, action);
    if(action.type=="[User] Get User Data Success")
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}
    
export const metaReducers: MetaReducer<any>[] = [persistStateReducer];