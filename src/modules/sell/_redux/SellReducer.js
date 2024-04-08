import * as Types from "./Types";

const initialState = {
  sellInput: {
    clientId: "",
    name: "",
    address: "",
    phone: "",
    previousDue: 0,
    balance: 0,
    discount: 0,
    productName: "",
    productId: "",
    mrp: 0,
    quantity: 1,
    balance: 0
  },
  sellArr: [],
  isSell: false,
  sellList: [],
  sellDeleted: false,
  isUpdated: false
};
const SellReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_SELL_INPUT:
      const sellInput = { ...state.sellInput };
      sellInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        sellInput: sellInput,
      };
    case Types.GET_SELL_ARR:
      const sellArr = [...state.sellArr];
      sellArr.push(action.payload)
      return {
        ...state,
        sellArr: sellArr,
      };
    case Types.AFTER_CREATE_SELL:
      const sellInput2 = initialState.sellInput;
      return {
        ...state,
        sellInput: sellInput2,
        sellArr: []
      };
    case Types.AFTER_UPDATE_SELL:
      return {
        ...state,
        isUpdated: action.payload
      };
    case Types.REMOVE_SELL_ARR:
      const removeSellArr = [...state.sellArr].filter(value => value.productId !== action.payload);
      return {
        ...state,
        sellArr: removeSellArr,
      };
    case Types.IS_CREATE_SELL:
      return {
        ...state,
        isSell: action.payload,
      };
    case Types.SELL_LIST:
      return {
        ...state,
        sellList: action.payload,
      };
    case Types.SELL_DELETED:
      return {
        ...state,
        sellDeleted: action.payload,
      };
    case Types.PRE_UPDATE_SELL:
      const { clientId, clientInfo, pay, discount, sellingProducts } = action.payload;
      const { name, address, phone, due } = clientInfo || {}
      const data = { clientId, name, address, phone, previousDue: due, balance: pay, discount, productName: "", productId: "", mrp: 0, quantity: 1 }
      let sellEdit = initialState.sellInput;
      sellEdit = data
      return {
        ...state,
        sellInput: sellEdit,
        sellArr: sellingProducts,
      };
    default:
      break;
  }
  return newState;
};
export default SellReducer;
