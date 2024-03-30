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
  if (productId.length === 0) {
    showToast("error", "Please select a product!");
    return 0;
  } else if (mrp < 0) {
    showToast("error", "Mrp shouldn't be negative!");
    return 0;
  } else if (quantity < 1) {
    showToast("error", "Quantity should be one or more");
    return 0;
  }
  dispatch(GetSellInput("productName", ""));
  dispatch(GetSellInput("productId", ""));
  dispatch(GetSellInput("mrp", 0));
  dispatch(GetSellInput("quantity", 1));
  const obj = { productId, productName, mrp, quantity }
  dispatch({ type: Types.GET_SELL_ARR, payload: obj });
};
export const RemoveSellArr = (id) => (dispatch) => {
  dispatch({ type: Types.REMOVE_SELL_ARR, payload: id });
};
export const SubmitSell = (data, arr) => (dispatch) => {
  const { clientId, balance, previousDue } = data
  const d = new Date()
  if (clientId.length === 0) {
    showToast("error", "Please select a client!");
    return 0;
  } else if (arr.length === 0) {
    showToast("error", "Please select at least one product");
    return 0;
  } else if (balance < 0) {
    showToast("error", "Pay amount shouldn't be negative");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sell`;
  dispatch({ type: Types.IS_CREATE_SELL, payload: true });
  const postData = {
    clientId, clientInfo: clientId, previousDue,
    currentDue: (getTotal(arr) + previousDue) - balance,
    total: getTotal(arr), grandTotal: getTotal(arr) + previousDue, pay: parseInt(balance), sellingDate: d, sellingProducts: arr
  };
  // console.log('postData', postData)
  // return 0
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_SELL, payload: false });
          dispatch({ type: Types.AFTER_CREATE_SELL, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_SELL, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_SELL, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_SELL, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const GetSellList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sell`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.SELL_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SellDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sell/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch({ type: Types.SELL_DELETED, payload: true });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const falseSellDeleted = () => (dispatch) => {
  dispatch({ type: Types.SELL_DELETED, payload: false });
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