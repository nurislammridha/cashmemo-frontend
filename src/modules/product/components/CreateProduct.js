import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProductInput,
  SubmitProduct,
} from "../_redux/ProductAction";
const CreateProduct = () => {
  const dispatch = useDispatch();

  const productInput = useSelector((state) => state.productInfo.productInput);
  const isCreateProduct = useSelector(
    (state) => state.productInfo.isCreateProduct
  );

  const handleSubmit = () => {
    dispatch(SubmitProduct(productInput));
  };
  const handleChangeInput = (name, value) => {
    dispatch(GetProductInput(name, value));
  };
  return (
    <>
      <h6 className="alert alert-secondary text-center">CREATE PRODUCT</h6>
      <div className="row">
        <div className="col-sm-8">
          <div>
            <h6>Product Name</h6>
            <input
              className="form-control"
              type="text"
              value={productInput.productName}
              onChange={(e) => handleChangeInput("productName", e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h6>Product MRP</h6>
            <input
              className="form-control"
              type="number"
              value={productInput.productMRP}
              onChange={(e) => handleChangeInput("productMRP", e.target.value)}
            />
          </div>
          <div className="mt-2 d-flex justify-content-end">
            {isCreateProduct ? (
              <a className="btn btn-outline-success mt-3">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </a>
            ) : (
              <a
                className="btn btn-outline-success mt-3"
                onClick={() => handleSubmit()}
              >
                Submit
              </a>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default CreateProduct;
