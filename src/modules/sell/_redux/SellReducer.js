import * as Types from "./Types";

const initialState = {
  sellInput: {
    clientId: "",
    name: "",
    address: "",
    phone: "",
    previousDue: 0,
    balance: 0,
    productName: "",
    productId: "",
    mrp: 0,
    quantity: 1,
    balance: 0
  },
  sellArr: [],
  isClient: false,
  clientList: [],
  clientDeleted: false
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
    case Types.REMOVE_SELL_ARR:
      const removeSellArr = [...state.sellArr].filter(value => value.productId !== action.payload);
      return {
        ...state,
        sellArr: removeSellArr,
      };
    case Types.IS_CREATE_CLIENT:
      return {
        ...state,
        isClient: action.payload,
      };
    case Types.CLIENT_LIST:
      return {
        ...state,
        clientList: action.payload,
      };
    case Types.CLIENT_DELETED:
      return {
        ...state,
        clientDeleted: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default SellReducer;
