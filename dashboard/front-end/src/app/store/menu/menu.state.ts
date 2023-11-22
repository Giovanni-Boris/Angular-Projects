export interface MenuState {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

export const initialState: MenuState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};