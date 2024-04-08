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
  const { clientId, balance, previousDue, discount } = data
  const d = new Date()
  if (clientId.length === 0) {
    showToast("error", "Please select a client!");
    return 0;
  } else if (arr.length === 0) {
    showToast("error", "Please select at least one product");
    return 0;
  } else if (discount < 0) {
    showToast("error", "Discount shouldn't be negative");
    return 0;
  } else if (balance < 0) {
    showToast("error", "Pay amount shouldn't be negative");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sell`;
  dispatch({ type: Types.IS_CREATE_SELL, payload: true });
  const postData = {
    clientId, clientInfo: clientId, previousDue,
    currentDue: (getTotal(arr) + previousDue) - (parseInt(balance) + parseInt(discount)),
    total: getTotal(arr), grandTotal: getTotal(arr) + (previousDue - parseInt(discount)),
    pay: parseInt(balance),
    sellingDate: d,
    sellingProducts: arr,
    discount: parseInt(discount)
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
export const FalseAfterUpdate = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATE_SELL, payload: false });
}
export const SubmitSellUpdate = (data, arr, id) => (dispatch) => {
  const { clientId, balance, previousDue, discount } = data
  const d = new Date()
  if (clientId.length === 0) {
    showToast("error", "Please select a client!");
    return 0;
  } else if (arr.length === 0) {
    showToast("error", "Please select at least one product");
    return 0;
  } else if (discount < 0) {
    showToast("error", "Discount shouldn't be negative");
    return 0;
  } else if (balance < 0) {
    showToast("error", "Pay amount shouldn't be negative");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sell/${id}`;
  dispatch({ type: Types.IS_CREATE_SELL, payload: true });
  const postData = {
    clientId, clientInfo: clientId, previousDue,
    currentDue: (getTotal(arr) + previousDue) - (parseInt(balance) + parseInt(discount)),
    total: getTotal(arr), grandTotal: getTotal(arr) + (previousDue - parseInt(discount)),
    pay: parseInt(balance),
    sellingDate: d,
    sellingProducts: arr,
    discount: parseInt(discount)
  };
  // console.log('postData', postData)
  // return 0
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_SELL, payload: false });
          dispatch({ type: Types.AFTER_CREATE_SELL, payload: true });
          dispatch({ type: Types.AFTER_UPDATE_SELL, payload: true });
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
        dispatch(GetSellList())
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
export const PreUpdateSell = (data) => (dispatch) => {
  dispatch({ type: Types.PRE_UPDATE_SELL, payload: data });
};

export const convertNumberToWords = (amount) => {
  var words = new Array();
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    let value = "";
    for (var i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        words_string += words[value] + " ";
      }
      if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Crores ";
      }
      if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Lakhs ";
      }
      if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Thousand ";
      }
      if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
        words_string += "Hundred and ";
      } else if (i == 6 && value != 0) {
        words_string += "Hundred ";
      }
    }
    words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}