import React from "react";
import CreateProductContainer from "./modules/product/views/CreateProductContainer";
import EditProductContainer from "./modules/product/views/EditProductContainer";
import ProductListContainer from "./modules/product/views/ProductListContainer";
import SellListContainer from "./modules/sell/views/SellListContainer";
import CreateSellContainer from "./modules/sell/views/CreateSellContainer";
import CreateClientContainer from "./modules/client/views/CreateClientContainer";
import ClientContainer from "./modules/client/views/ClientContainer";
import DownloadPdf from "./modules/sell/components/DownloadPdf";
import UpdateClientContainer from "./modules/client/views/UpdateClientContainer";
import UpdateSellContainer from "./modules/sell/views/UpdateSellContainer";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/sell", name: "Sell", component: SellListContainer },
  { path: "/sell-edit/:id", name: "Sell", component: UpdateSellContainer },
  {
    path: "/sell-add",
    name: "Create Sell",
    component: CreateSellContainer,
  },
  { path: "/client", name: "Client", component: ClientContainer },
  { path: "/client-edit/:id", name: "Client", component: UpdateClientContainer },
  {
    path: "/client-add",
    name: "Create Client",
    component: CreateClientContainer,
  },
  {
    path: "/product",
    name: "Product List",
    component: ProductListContainer,
  },
  {
    path: "/product-add",
    name: "Create Product",
    component: CreateProductContainer,
  },
  {
    path: "/product-edit/:id",
    name: "Create Product",
    component: EditProductContainer,
  },
  {
    path: "/download",
    name: "download pdf",
    component: DownloadPdf,
  },


];

export default routes;
