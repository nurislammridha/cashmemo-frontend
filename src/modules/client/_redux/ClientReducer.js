import * as Types from "./Types";

const initialState = {
  isClient: false,
  clientList: [],
  clientDeleted: false
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
    default:
      break;
  }
  return newState;
};
export default ClientReducer;
