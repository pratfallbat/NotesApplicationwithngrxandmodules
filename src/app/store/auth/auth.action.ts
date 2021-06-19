import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login Start";

export const SIGNUP_START = "[Auth] Signup Start";

// export const LOGIN = '[Auth] Login';
export const AUTHENTICATE_SUCCESS = "[Auth] Authenticate";
export const LOGOUT = "[Auth] Logout";
// export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTHENTICATE_FAIL = "[Auth] Login Fail";

export const CLEAR_ERROR = "[Auth] Clear Error";

export const AUTO_LOGIN = "[Auth] Auto Login";

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

// export type AuthAction = Login | Logout | LoginStart | LoginFail;
export type AuthAction =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin;
