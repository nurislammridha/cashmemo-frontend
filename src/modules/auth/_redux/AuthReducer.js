import * as Types from "./Types";

const initialState = {
  isLogin: false,
  loginSuccess: false,
};
const AuthReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case Types.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default AuthReducer;
