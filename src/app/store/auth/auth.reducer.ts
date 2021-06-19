import { User } from "src/app/pages/auth/user.model";
import * as AuthActions from "../auth/auth.action";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialUser: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialUser,
  action: AuthActions.AuthAction
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }

  // return state;
}
