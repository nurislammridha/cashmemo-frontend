import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitLogin = (data) => (dispatch) => {
  if (data.email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (data.password.length === 0) {
    showToast("error", "password should not be empty");
    return 0;
  } else if (data.password.length < 6) {
    showToast("error", "Password should be minimum six charecter!");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}admin/login`;
  dispatch({ type: Types.IS_LOGIN, payload: true });
  try {
    Axios.post(url, data)
      .then((res) => {
        console.log(`res`, res);
        if (res.data.status) {
          showToast("success", res.data.message);
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("isLogin", "true");
          dispatch({ type: Types.IS_LOGIN, payload: false });
          dispatch({ type: Types.LOGIN_SUCCESS, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const SetFalseLogin = () => (dispatch) => {
  dispatch({ type: Types.LOGIN_SUCCESS, payload: false });
};
