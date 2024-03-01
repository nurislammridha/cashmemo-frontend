import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const GetSellInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_SELL_INPUT, payload: formData });

};
export const GetSellArr = (data) => (dispatch) => {
  const { productId, productName, mrp, quantity } = data
  const obj = { productId, productName, mrp, quantity }
  dispatch({ type: Types.GET_SELL_ARR, payload: obj });
};
export const RemoveSellArr = (id) => (dispatch) => {
  dispatch({ type: Types.REMOVE_SELL_ARR, payload: id });
};
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

export const getClientOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.name,
        value: item._id,
        address: item.address,
        phone: item.phone,
        previousDue: item.due,
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getProductOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.productName,
        value: item._id,
        mrp: item.productMRP,
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getTotal = (data) => {
  let total = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      total = total + item.quantity * item.mrp
    });
  }
  return total;
};