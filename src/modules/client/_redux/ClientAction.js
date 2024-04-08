import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitClient = ({ name, address, phone }) => (dispatch) => {
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (address.length === 0) {
    showToast("error", "Address shouldn't be empty");
    return 0;
  } else if (phone.length === 0) {
    showToast("error", "Phone shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}client`;
  dispatch({ type: Types.IS_CREATE_CLIENT, payload: true });
  const postData = { name, address, phone };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_CLIENT, payload: false });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_CLIENT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_CLIENT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_CLIENT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const UpdateClientData = ({ name, address, phone, id }) => (dispatch) => {
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (address.length === 0) {
    showToast("error", "Address shouldn't be empty");
    return 0;
  } else if (phone.length === 0) {
    showToast("error", "Phone shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}client/${id}`;
  dispatch({ type: Types.IS_UPDATE_CLIENT, payload: true });
  const postData = { name, address, phone };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CLIENT, payload: false });
          dispatch({ type: Types.AFTER_UPDATE_CLIENT, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CLIENT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_CLIENT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_CLIENT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const FalseUpdate = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATE_CLIENT, payload: false });
}
export const GetClientList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.CLIENT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ClientDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch({ type: Types.CLIENT_DELETED, payload: true });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const falseClientDeleted = () => (dispatch) => {
  dispatch({ type: Types.CLIENT_DELETED, payload: false });
}
export const FalsePaid = () => (dispatch) => {
  dispatch({ type: Types.IS_PAID_CLIENT, payload: false });
}
export const SubmitPay = ({ _id, amount, due }) => (dispatch) => {
  if (amount <= 0) {
    showToast("error", "Payment amount shouldn't be zero or negative!");
    return 0;
  } else if (amount > due) {
    showToast("error", "Payment amount shouldn't be greater than due");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}client/due`;
  dispatch({ type: Types.IS_PAY_CLIENT, payload: true });
  const postData = { clientId: _id, amount: due - amount };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_PAY_CLIENT, payload: false });
          dispatch({ type: Types.IS_PAID_CLIENT, payload: true });
          dispatch(GetClientList())
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_PAY_CLIENT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_PAY_CLIENT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_PAY_CLIENT, payload: false });
    showToast("error", "Something went wrong");
  }
};