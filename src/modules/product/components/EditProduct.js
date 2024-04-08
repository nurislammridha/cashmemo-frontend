import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  FalseUpdate,
  GetProductInput,
  UpdateProduct,
} from "../_redux/ProductAction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams()
  const productInput = useSelector((state) => state.productInfo.productInput);
  const afterUpdate = useSelector((state) => state.productInfo.afterUpdate);
  const isCreateProduct = useSelector(
    (state) => state.productInfo.isCreateProduct
  );
  const handleSubmit = () => {
    dispatch(UpdateProduct(productInput, id));
  };
  const handleChangeInput = (name, value, e) => {
    dispatch(GetProductInput(name, value, e));
  };

  useEffect(() => {
    if (afterUpdate) {
      history.push("/product");
      dispatch(FalseUpdate());
    }
  }, [afterUpdate]);

  return (
    <>
      <h6 className="alert alert-secondary text-center">UPDATE PRODUCT</h6>
      <div className="row">
        <div className="col-sm-6">
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
                UPDATE
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
