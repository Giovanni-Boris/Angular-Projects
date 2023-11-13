import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.reducer";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectToken = createSelector(
  authFeature,
  (state) => state.token,
);

export const selectIsFecthing = createSelector(
  authFeature,
  (state) => state.isFetching ,
);

export const selectTokenId = createSelector(
  authFeature,
  (state) => state.token?.id,
);
export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.token
);
export const selectUserData = createSelector(
  authFeature,
  (state) => state.user.userId === 0 ? null : state.user
);
export const selectUserName = createSelector(
  authFeature,
  (state) => state.user.name,
);