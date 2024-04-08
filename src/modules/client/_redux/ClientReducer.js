import * as Types from "./Types";

const initialState = {
  isClient: false,
  clientList: [],
  clientDeleted: false,
  isUpdateClient: false,
  isUpdatedClient: false,
  isPayClient: false,
  isPaidClient: false,
};
const ClientReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
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
    case Types.AFTER_UPDATE_CLIENT:
      return {
        ...state,
        isUpdatedClient: action.payload,
      };
    case Types.IS_UPDATE_CLIENT:
      return {
        ...state,
        isUpdateClient: action.payload,
      };
    case Types.IS_PAY_CLIENT:
      return {
        ...state,
        isPayClient: action.payload,
      };
    case Types.IS_PAID_CLIENT:
      return {
        ...state,
        isPaidClient: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default ClientReducer;
