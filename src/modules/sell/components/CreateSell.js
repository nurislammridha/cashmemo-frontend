import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetClientList, GetSellArr, GetSellInput, RemoveSellArr, SubmitClient, getClientOption, getProductOption, getTotal } from "../_redux/SellAction";
import Select from "react-select";
import { GetproductList } from "src/modules/product/_redux/ProductAction";
const CreateSell = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const sellInput = useSelector((state) => state.sellInfo.sellInput);
  const sellArr = useSelector((state) => state.sellInfo.sellArr);
  const isClient = useSelector((state) => state.clientInfo.isClient);
  const isSuccess = useSelector((state) => state.clientInfo.isSuccess);
  const ClientArrList = useSelector(
    (state) => state.clientInfo.clientList
  );
  const ProductArrList = useSelector(
    (state) => state.productInfo.productList
  );
  const dispatch = useDispatch();
  const handleChangeInput = (name, value) => {
    dispatch(GetSellInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(SubmitClient({ name, address, phone }));
  };
  const handleRemove = (id) => {
    dispatch(RemoveSellArr(id));
  };
  const handleAdd = () => {
    dispatch(GetSellArr(sellInput));
    handleChangeInput("productName", "");
    handleChangeInput("productId", "");
    handleChangeInput("mrp", 0);
    handleChangeInput("quantity", 1);
  };
  useEffect(() => {
    dispatch(GetClientList());
    dispatch(GetproductList());
  }, [])

  useEffect(() => {
    if (!isClient) {
      setName("")
      setAddress("")
      setPhone("")
    }
  }, [isClient])
  console.log('sellArr', sellArr)
  return (
    <>
      <h6 className="alert alert-secondary text-center">Sell Your Products</h6>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Select Client</h6>
            <Select
              options={getClientOption(ClientArrList)}
              value={{ label: sellInput.name }}
              onChange={(e) => {
                handleChangeInput("name", e.label);
                handleChangeInput("clientId", e.value);
                handleChangeInput("address", e.address);
                handleChangeInput("phone", e.phone);
                handleChangeInput("previousDue", e.previousDue);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Select Products</h6>
            <Select
              options={getProductOption(ProductArrList)}
              value={{ label: sellInput.productName }}
              onChange={(e) => {
                handleChangeInput("productName", e.label);
                handleChangeInput("productId", e.value);
                handleChangeInput("mrp", e.mrp);
              }}
            />
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-sm-4">
                <h6 className="mb-3">Mrp</h6>
                <input
                  className="form-control"
                  value={sellInput.mrp}
                  type="number"
                  placeholder="enter mrp"
                  onChange={(e) => handleChangeInput("mrp", e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <div className="ml-3">
                  <h6 className="mb-3">Quantity</h6>
                  <input
                    className="form-control"
                    value={sellInput.quantity}
                    type="number"
                    placeholder="enter quantity"
                    onChange={(e) => handleChangeInput("quantity", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="ml-3">
                  <h6 className="mb-3">Total</h6>
                  <input
                    disabled
                    className="form-control"
                    value={sellInput.mrp * sellInput.quantity}
                    type="number"
                    placeholder="amount"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <a
              className="btn btn-success btn-sm mt-3 text-light"
              onClick={() => handleAdd()}
            >
              ADD
            </a>
          </div>

        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="mt-5">
        <div>
          <h6 className="mb-3">Name</h6>
          <input
            className="form-control"
            value={sellInput.name}
            type="text"
            placeholder="enter name"
            onChange={(e) => handleChangeInput("name", e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h6 className="mb-3">Address</h6>
          <input
            className="form-control"
            value={sellInput.address}
            type="text"
            placeholder="enter address"
            onChange={(e) => handleChangeInput("address", e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h6 className="mb-3">Phone</h6>
          <input
            className="form-control"
            value={sellInput.phone}
            type="text"
            placeholder="01XXXXXXXXX"
            onChange={(e) => handleChangeInput("phone", e.target.value)}
          />
        </div>

      </div>
      <div className="mt-3">
        {sellArr.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Mrp</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {sellArr.map((item, index) => (

                <tr>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.mrp} tk</td>
                  <td>{item.quantity * item.mrp} tk </td>
                  <td><a
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.productId)}
                  >
                    <i className="fa fa-trash"></i>
                  </a></td>
                </tr>
              ))}
              <tr><td colSpan={5}></td></tr>
              <tr>
                <td colSpan={3}></td>
                <td>Total</td>
                <td>{getTotal(sellArr)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Pre. Due</td>
                <td>{sellInput.previousDue}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Gra. Total</td>
                <td>{getTotal(sellArr) + sellInput.previousDue}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Balance</td>
                <td colSpan={2}>
                  <input
                    style={{ width: "200px" }}
                    className="form-control"
                    value={sellInput.balance}
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleChangeInput("balance", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Due</td>
                <td>{(getTotal(sellArr) + sellInput.previousDue) - sellInput.balance}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div>
        {isClient ? (
          <a className="btn btn-success btn-sm mt-3 text-light">
            {" "}
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </a>
        ) : (
          <a
            className="btn btn-success btn-sm mt-3 text-light"
            onClick={() => handleSubmit()}
          >
            SUBMIT
          </a>
        )}
      </div>
    </>
  );
};

export default CreateSell;
