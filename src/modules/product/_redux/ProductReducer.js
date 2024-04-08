import * as Types from "./Types";

const initialState = {
  productList: null,
  productInput: {
    productName: "",
    productMRP: ""
  },
  isCreateProduct: false,
  afterUpdate: false,
  productDeleted: false
};
const ProductReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_PRODUCT_INPUT:
      const productInput = { ...state.productInput };
      productInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        productInput: productInput,
      };
    case Types.PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case Types.IS_CREATE_PRODUCT:
      return {
        ...state,
        isCreateProduct: action.payload,
      };
    case Types.AFTER_CREATE_PRODUCT:
      const productInputAfter = initialState.productInput;
      return {
        ...state,
        productInput: productInputAfter,
      };
    case Types.AFTER_UPDATE_PRODUCT:
      return {
        ...state,
        afterUpdate: action.payload,
      };
    case Types.PRODUCT_DELETED:
      return {
        ...state,
        productDeleted: action.payload
      }
    case Types.PRE_UPDATE_PRODUCT:
      const {
        productName,
        productMRP
      } = action.payload;
      let productEdit = initialState.productInput;
      productEdit.productName = productName;
      productEdit.productMRP = productMRP;
      return {
        ...state,
        productInput: productEdit,
      };
    default:
      break;
  }
  return newState;
};
export default ProductReducer;
