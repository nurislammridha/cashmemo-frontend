import { combineReducers } from "redux";
import AuthReducer from "src/modules/auth/_redux/AuthReducer";
import ProductReducer from "src/modules/product/_redux/ProductReducer";
import ClientReducer from "src/modules/client/_redux/ClientReducer";
import SellReducer from "src/modules/sell/_redux/SellReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
  authInfo: AuthReducer,
  clientInfo: ClientReducer,
  productInfo: ProductReducer,
  sellInfo: SellReducer
});

export default rootReducer;
