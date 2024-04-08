import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import {
  GetProductByCategory,
  PreUpdateProduct,
  ProductDelete,
  setProductDeleteFalse,
} from "../_redux/ProductAction";
const ProductList = () => {
  const history = useHistory();
  const productArrList = useSelector((state) => state.productInfo.productList);
  const productDeleted = useSelector((state) => state.productInfo.productDeleted);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this product?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(ProductDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleEdit = (data) => {
    dispatch(PreUpdateProduct(data));
    history.push(`/product-edit/${data._id}`);
  };

  useEffect(() => {
    dispatch(GetProductByCategory());
  }, []);
  useEffect(() => {
    if (productDeleted) {
      dispatch(GetProductByCategory());
      dispatch(setProductDeleteFalse());
    }

  }, [productDeleted]);
  console.log('productDeleted', productDeleted)
  return (
    <>
      <div className="row alert alert-secondary">
        <div className="col-sm-2">
          <h6>Product List</h6>
        </div>
        <div className="col-sm-2">

        </div>
        <div className="col-sm-2">

        </div>
        <div className="col-sm-4"></div>
        <div className="col-sm-2">
          <a
            className="btn btn-success btn-sm text-light"
            onClick={() => history.push("/product-add")}
          >
            Add Product
          </a>
        </div>
      </div>
      <div className="mt-3">
        {productArrList != null && productArrList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>MRP</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.productMRP}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductList;
