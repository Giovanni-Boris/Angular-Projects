import { Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { AuthState } from "./user/user.reducer";

export function persistStateReducer(_reducer: ActionReducer<AuthState>) {
  const sessionStorageKey = '__auth';
  return (state: AuthState | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = sessionStorage.getItem(sessionStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }
    const nextState = _reducer(state, action);
    if(action.type=="[Auth] Get User Data Success")
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}
    
export const metaReducers: MetaReducer<any>[] = [persistStateReducer];