import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FalseAfterUpdate, GetSellArr, GetSellInput, RemoveSellArr, SubmitClient, SubmitSell, SubmitSellUpdate, getClientOption, getProductOption, getTotal } from "../_redux/SellAction";
import Select from "react-select";
import { GetproductList } from "src/modules/product/_redux/ProductAction";
import { GetClientList } from "src/modules/client/_redux/ClientAction";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
const UpdateSell = () => {
  const { id } = useParams()
  const history = useHistory()
  const sellInput = useSelector((state) => state.sellInfo.sellInput);
  const sellArr = useSelector((state) => state.sellInfo.sellArr);
  const isSell = useSelector((state) => state.sellInfo.isSell);
  const isUpdated = useSelector((state) => state.sellInfo.isUpdated);
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
    dispatch(SubmitSellUpdate(sellInput, sellArr, id));
  };
  const handleRemove = (id) => {
    dispatch(RemoveSellArr(id));
  };
  const handleAdd = () => {
    dispatch(GetSellArr(sellInput));

  };
  useEffect(() => {
    dispatch(GetClientList());
    dispatch(GetproductList());
  }, [])
  useEffect(() => {
    if (isUpdated) {
      history.push("/sell")
      dispatch(FalseAfterUpdate())
    }
  }, [isUpdated])

  console.log('sellInput', sellInput)
  console.log('sellt', sellArr)
  return (
    <>
      <h6 className="alert alert-secondary text-center">Update Your Selling Info</h6>
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
            disabled
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
            disabled
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
            disabled
            className="form-control"
            value={sellInput.phone}
            type="text"
            placeholder="01XXXXXXXXX"
            onChange={(e) => handleChangeInput("phone", e.target.value)}
          />
        </div>

      </div>
      <div className="mt-3">
        {sellArr?.length > 0 && (
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
              <tr><td colSpan={6}></td></tr>
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
                <td>Discount</td>
                <td colSpan={2}>
                  <input
                    style={{ width: "200px" }}
                    className="form-control ml-2"
                    value={sellInput.discount}
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleChangeInput("discount", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Gra. Total</td>
                <td>{getTotal(sellArr) + sellInput.previousDue - sellInput.discount}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td>Pay</td>
                <td colSpan={2}>
                  <input
                    style={{ width: "200px" }}
                    className="form-control ml-2"
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
                <td>{(getTotal(sellArr) + sellInput.previousDue) - (parseInt(sellInput.balance) + parseInt(sellInput.discount))}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div>
        {isSell ? (
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
            UPDATE
          </a>
        )}
      </div>
    </>
  );
};

export default UpdateSell;
