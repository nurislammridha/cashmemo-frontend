import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//

export const GetProductInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_PRODUCT_INPUT, payload: formData });

};
export const SubmitProduct = (data) => (dispatch) => {
  const { productMRP, productName } = data
  if (productName.length === 0) {
    showToast("error", "Product name shouldn't be empty");
    return 0;
  } else if (productMRP.length === 0) {
    showToast("error", "Product MRP shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}product`;
  dispatch({ type: Types.IS_CREATE_PRODUCT, payload: true });
  try {
    Axios.post(url, { productName, productMRP })
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
          dispatch({ type: Types.AFTER_CREATE_PRODUCT, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const UpdateProduct = (data) => (dispatch) => {
  if (data.productName.length === 0) {
    showToast("error", "Product name shouldn't be empty");
    return 0;
  } else if (data.productNameBn.length === 0) {
    showToast("error", "Product name bangla shouldn't be empty");
    return 0;
  } else if (data.productMRP.length === 0) {
    showToast("error", "Product MRP shouldn't be empty");
    return 0;
  } else if (data.productMRPBn.length === 0) {
    showToast("error", "Product MRP bangla shouldn't be empty");
    return 0;
  } else if (data.discountPrice.length === 0) {
    showToast("error", "Discount price shouldn't be empty");
    return 0;
  } else if (data.discountPriceBn.length === 0) {
    showToast("error", "Discount price bangla shouldn't be empty");
    return 0;
  } else if (data.productCode.length === 0) {
    showToast("error", "Product code shouldn't be empty");
    return 0;
  }
  // else if (data.productImage.length === 0) {
  //   showToast("error", "Please select a product image");
  //   return 0;
  // }
  const url = `${process.env.REACT_APP_API_URL}product/${data.id}`;
  dispatch({ type: Types.IS_CREATE_PRODUCT, payload: true });
  const formData = new FormData();
  formData.append("product_name", data.productName);
  formData.append("product_name_bn", data.productNameBn);
  formData.append("product_mrp", data.productMRP);
  formData.append("product_mrp_bn", data.productMRPBn);
  formData.append("is_discount", true);
  formData.append("discount_price", data.discountPrice);
  formData.append("discount_price_bn", data.discountPriceBn);
  formData.append("is_active", data.isActive);
  formData.append("priority", data.priority);
  if (data.productImage.length === undefined) {
    formData.append("product_image", data.productImage);
  }
  formData.append("product_code", data.productCode);

  try {
    Axios.put(url, formData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
          dispatch({ type: Types.AFTER_CREATE_PRODUCT, payload: true });
          dispatch({ type: Types.AFTER_UPDATE_PRODUCT, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const FalseUpdate = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATE_PRODUCT, payload: false });
};
export const GetproductList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetProductByCategory = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const PreUpdateProduct = (data) => (dispatch) => {
  dispatch({ type: Types.PRE_UPDATE_PRODUCT, payload: data });
};
export const ProductDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch({ type: Types.PRODUCT_DELETED, payload: true })
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const setProductDeleteFalse = () => (dispatch) => {
  dispatch({ type: Types.PRODUCT_DELETED, payload: false })
}
export const getCategoryOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.categoryName,
        value: item._id,
        categoryNameBn: item.categoryNameBn,
      };
      arr.push(obj);
    });
  }
  return arr;
};
